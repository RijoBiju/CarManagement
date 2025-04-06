import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BASE_URL } from "../api/index.ts";
import { Button } from "@/components/ui/button.tsx";

interface Car {
  carId: string;
  carBrand: string;
  carModel: string;
  carPlate: string;
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/cars`, {
          credentials: "include",
        });
        const resJson = await response.json();
        setCars(resJson);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="py-10 px-16">
      <h1 className="text-2xl font-bold mb-4">All Cars</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Quick Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.length
            ? cars?.map((car) => (
                <TableRow key={car.carId}>
                  <TableCell className="font-medium">
                    {car.carBrand.substring(0, 30)}
                  </TableCell>
                  <TableCell>{car.carModel.substring(0, 30)}</TableCell>
                  <TableCell>{car.carPlate.substring(0, 30)}</TableCell>
                  <TableCell>
                    <Link to={`/dashboard/cars/${car.carId}`}>
                      <Button>Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            : "Loading all cars"}
        </TableBody>
      </Table>
    </div>
  );
}
