import BasicForm from "@/components/CarPageForms/BasicForm";
import VehicleDetailsForm from "@/components/CarPageForms/VehicleDetailsForm";
import ExpenditureForm from "@/components/CarPageForms/ExpenditureForm";
import SellingPriceForm from "@/components/CarPageForms/SellingPriceForm";
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

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../api/index.js";

export default function CarPage() {
  const [carData, setCarData] = useState([]);
  const [selectedTag, setSelectedTag] = useState("initial");
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const carId = useParams().carId;

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/cars/${carId}`);
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, []);

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

      if (response.ok) {
        alert("Image uploaded successfully!");
        setOpen(false);
        setImage(null);
        setSelectedTag("initial");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        const imagesResponse = await fetch(
          `${BASE_URL}/api/car/${carId}/image`
        );
        const imagesData = await imagesResponse.json();
        setImages(imagesData);
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred.");
    }
  };
  const [images, setImages] = useState<{ url: string; tag: string }[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);
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

  return (
    <div className="py-10 px-16">
      <h1 className="text-3xl font-bold mb-10">
        <span className="text-slate-500 mr-5">{carId}</span>
        {carData.carBrand}
        <span className="text-sm ml-4">{carData.carModel}</span>
      </h1>

      {/* Images section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-6">Car Images</h3>
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

        {imagesLoading ? (
          <div className="text-center py-8">Loading images...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group border rounded-lg overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={`Car ${image.tag} view`}
                  className="h-48 w-full object-cover hover:scale-105 transition-transform"
                  loading="lazy"
                />
                <div className="p-2 bg-white dark:bg-gray-800">
                  <span className="text-sm font-medium capitalize">
                    {image.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!imagesLoading && images.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Upload className="mx-auto h-12 w-12 mb-4" />
            <p>No images uploaded yet</p>
          </div>
        )}
      </div>

      <BasicForm defaultValues={carData} />
      <VehicleDetailsForm defaultValues={carData} />
      <ExpenditureForm carId={carId} />
      <SellingPriceForm defaultValues={carData} />
    </div>
  );
}
