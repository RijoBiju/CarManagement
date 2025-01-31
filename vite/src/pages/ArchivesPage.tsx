import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Archive } from "lucide-react";

const cars = [
  // { id: 1, make: "Toyota", model: "Camry", year: 2021, completeInfo: true },
  // { id: 2, make: "Honda", model: "Accord", year: 2020, completeInfo: true },
  // { id: 3, make: "Tesla", model: "Model S", year: 2023, completeInfo: false },
];

export default function ArchivesPage() {
  const handleArchiveClick = () => {
    // send request to backend
    // on success remove the car from the list
    // show a toast to the user
  };

  return (
    <div className="py-10 px-16">
      <h1 className="text-2xl font-bold mb-4">Archives</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">CarId</TableHead>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Quick Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell className="font-medium">{car.id}</TableCell>
              <TableCell className="font-medium">{car.make}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell className="text-right">
                <Button variant="default" onClick={handleArchiveClick}>
                  <Archive size="16" />
                  Unarchive
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
