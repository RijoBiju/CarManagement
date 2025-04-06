// @ts-nocheck

import BasicForm from "@/components/CarPageForms/BasicForm";
import VehicleDetailsForm from "@/components/CarPageForms/VehicleDetailsForm";
import ExpenditureForm from "@/components/CarPageForms/ExpenditureForm";
import SellingPriceForm from "@/components/CarPageForms/SellingPriceForm";
import ProfitCalculator from "@/components/ProfitCalculator/ProfitCalculator.tsx";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BASE_URL } from "../api/index.ts";
import CarImageForm from "@/components/CarPageForms/CarImageForm.tsx";

export default function CarPage() {
  const [carData, setCarData] = useState([]);

  const carId = useParams().carId;

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/cars/${carId}`, {
          credentials: "include",
        });
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [carId]);

  return (
    <div className="py-10 px-16">
      <h1 className="text-3xl font-bold mb-10">
        {carData.carBrand}
        <span className="text-sm ml-4">{carData.carModel}</span>
      </h1>

      <CarImageForm />
      <BasicForm defaultValues={carData} />
      <VehicleDetailsForm defaultValues={carData} />
      <ExpenditureForm />
      <SellingPriceForm defaultValues={carData} />

      <ProfitCalculator totalExpenditure={3000} sellingPrice={5000} />
    </div>
  );
}
