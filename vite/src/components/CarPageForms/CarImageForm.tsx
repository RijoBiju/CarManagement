import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { BASE_URL } from "@/api";
import CarImageView from "../CarImageView";

interface Image {
  imageUrl: string;
  tag: string;
  fileName: string;
}

export type SelectedImageTabType = "initial" | "final";
export type SelectedTagType = "initial" | "final";

export default function CarImageForm() {
  const carId = useParams().carId;

  const [images, setImages] = useState<Image[]>([]);
  const [imagesLoading, setImagesLoading] = useState<boolean>(true);

  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedTag, setSelectedTag] = useState<SelectedTagType>("initial");

  const [selectedImageTab, setSelectedImageTab] =
    useState<SelectedImageTabType>("initial");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setImagesLoading(true);
        const response = await fetch(`${BASE_URL}/api/car/${carId}/image`);
        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setImagesLoading(false);
      }
    };

    fetchImages();
  }, [carId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("tag", selectedTag);

    try {
      const response = await fetch(`${BASE_URL}/api/cars/${carId}/image`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 400) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }

      if (response.ok) {
        alert("Image uploaded successfully!");
        setOpen(false);
        setImage(null);
        const prevSelected = selectedTag;
        setSelectedTag("initial");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        const imagesResponse = await fetch(
          `${BASE_URL}/api/car/${carId}/image`
        );
        const imagesData = await imagesResponse.json();
        setImages(imagesData);
        setSelectedImageTab(prevSelected as SelectedImageTabType);
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="mt-8">
      <div className="flex mb-10 items-center">
        <h3 className="text-xl font-semibold mr-6">Car Images</h3>
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              setImage(null);
              setSelectedTag("initial");
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline">
              <Upload size="16" className="mr-2" />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
              <DialogDescription>
                Select an image and choose its type.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 block"
                ref={fileInputRef}
              />
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="initial"
                    checked={selectedTag === "initial"}
                    onChange={(e) => setSelectedTag(e.target.value)}
                  />
                  <span>Initial</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="final"
                    checked={selectedTag === "final"}
                    onChange={(e) => setSelectedTag(e.target.value)}
                  />
                  <span>Final</span>
                </label>
              </div>
              <Button onClick={handleUpload} disabled={!image}>
                <Upload size="16" className="mr-2" />
                Upload Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <CarImageView
        images={images}
        imagesLoading={imagesLoading}
        selectedImageTab={selectedImageTab}
        setSelectedImageTab={setSelectedImageTab}
      />
    </div>
  );
}
