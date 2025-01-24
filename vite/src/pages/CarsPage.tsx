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

const cars = [
  { id: 1, make: "Toyota", model: "Camry", year: 2021, completeInfo: true },
  { id: 2, make: "Honda", model: "Accord", year: 2020, completeInfo: true },
  { id: 3, make: "Tesla", model: "Model S", year: 2023, completeInfo: false },
];

export default function CarsPage() {
  const { toast } = useToast();
  // const [cars, setCars] = useState([]);

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/cars");
  //       setCars(response.data);
  //     } catch (error) {
  //       console.error("Error fetching cars:", error);
  //     }
  //   };

  //   fetchCars();
  // }, []);

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
              <Link to={`/dashboard/cars/${car.id}`}>
                <TableCell className="font-medium">
                  {car.id}
                  {!car.completeInfo && <Badge>Incomplete Information</Badge>}
                </TableCell>
                <TableCell className="font-medium">{car.make}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell className="text-right">
                  <Button variant="default" onClick={handleArchiveClick}>
                    <Archive size="16" />
                    Archive
                  </Button>

                  <AlertDialog>
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
                  </AlertDialog>
                </TableCell>
              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
