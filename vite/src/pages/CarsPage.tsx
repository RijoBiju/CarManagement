import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Archive, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

import { BASE_URL } from "../api/index.js";

export default function CarsPage() {
  const { toast } = useToast();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/cars`);
        const resJson = await response.json();
        setCars(resJson);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleArchiveClick = () => {
    // send request to backend
    // on success remove the car from the list
    // show a toast to the user
  };

  const handleDeleteClick = () => {
    // Show user confirmation dialog
    // on success remove the car from the list
    // close the dialog
    // show a toast to the user
    toast({
      title: "Deleted {CarId}",
      description: "Successfully deleted",
    });
  };

  return (
    <div className="py-10 px-16">
      <h1 className="text-2xl font-bold mb-4">All Cars</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Quick Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars?.map((car) => (
            <TableRow key={car.carId}>
              <Link to={`/dashboard/cars/${car.carId}`}>
                <TableCell className="font-medium">{car.carBrand}</TableCell>
                <TableCell>{car.carModel}</TableCell>
                <TableCell>{car.carPlate}</TableCell>
                {/* <TableCell className="text-right">
                  <Button variant="default" onClick={handleArchiveClick}>
                    <Archive size="16" />
                    Archive
                  </Button> */}

                {/* <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="destructive">
                        <Trash size="16" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You can safely archive a car instead of deleting it,
                          ensuring the information is preserved for future
                          reference.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteClick}>
                          Delete permanently
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog> */}
                {/* </TableCell> */}
              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
