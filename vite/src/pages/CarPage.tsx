import BasicForm from "@/components/CarPageForms/BasicForm";
import VehicleDetailsForm from "@/components/CarPageForms/VehicleDetailsForm";
import ExpenditureForm from "@/components/CarPageForms/ExpenditureForm";
import SellingPriceForm from "@/components/CarPageForms/SellingPriceForm";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CarPage() {
  const [carData, setCarData] = useState([]);
  const [selectedTag, setSelectedTag] = useState("initial");
  const [image, setImage] = useState<File | null>(null);

  const carId = useParams().carId;

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cars/${carId}`);
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, []);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTag(e.target.value);
  };

  // Handle form submission
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("tag", selectedTag);
    formData.append("carId", carId || "");

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
        setImage(null); // Reset input
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="py-10 px-16">
      <h1 className="text-3xl font-bold mb-10">
        <span className="text-slate-500 mr-5">{carId}</span>
        {carData.carBrand}
        <span className="text-sm ml-4">{carData.carModel}</span>
      </h1>

      {/* Images section */}
      <h3 className="text-xl font-semibold mb-6">Car images</h3>

      <div className="bg-gray-100 p-8 rounded-lg text-gray-500">
        <p className="mb-4">Upload an image and select a tag:</p>

        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 block"
        />

        {/* Checkbox group */}
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="initial"
              checked={selectedTag === "initial"}
              onChange={handleCheckboxChange}
            />
            <span>Initial</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="final"
              checked={selectedTag === "final"}
              onChange={handleCheckboxChange}
            />
            <span>Final</span>
          </label>
        </div>

        {/* Upload button */}
        <Button variant="outline" onClick={handleUpload}>
          <Upload size="16" className="mr-2" />
          Upload Image
        </Button>
      </div>

      <BasicForm defaultValues={carData} />
      <VehicleDetailsForm defaultValues={carData} />
      <ExpenditureForm carId={carId} />
      <SellingPriceForm defaultValues={carData} />
    </div>
  );
}
