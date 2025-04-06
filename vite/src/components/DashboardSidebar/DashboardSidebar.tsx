// TODO: The add car dialog form should probably be in its own component

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Archive,
  Car,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  SquareKanban,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useState } from "react";
import { BASE_URL } from "@/api";

export default function DashboardSidebar() {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false); // New state for dialog control

  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carPlate, setCarPlate] = useState("");

  const handleAddCarClick = async () => {
    const response = await fetch(`${BASE_URL}/api/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carBrand,
        carModel,
        carPlate,
      }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      const newCarId = data.Data.car_id;
      setIsDialogOpen(false);
      navigate(`/dashboard/cars/${newCarId}`);
    } else {
      console.error("Failed to add car");
    }
  };

  return (
    <div className="border-r h-screen p-4 py-8 sticky top-0">
      <div className="flex items-center mb-10">
        <Avatar className="mr-5">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-slate-600">John Doe</p>
      </div>

      <h3 className="font-semibold text-lg mb-4 ml-2">
        Add a car
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button size="sm" className="ml-3">
                    <Plus size="16" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add new car</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new car</DialogTitle>
              <DialogDescription>
                Add basic car information. You will be able to add more details
                in the car page.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Car Brand
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={carBrand}
                  onChange={(e) => setCarBrand(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Car Model
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Plate Number
                </Label>
                <Input
                  id="username"
                  className="col-span-3"
                  value={carPlate}
                  onChange={(e) => setCarPlate(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCarClick}>
                Add car
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </h3>

      <div className="flex flex-col gap-1 mb-8 mt-8">
        <Link to="/dashboard">
          <Button variant="ghost" className="px-4 w-[240px] justify-between ">
            <div className="flex items-center">
              <LayoutDashboard className="mr-3" size="16" />
              <p className=" font-semibold ">Dashboard</p>
            </div>
          </Button>
        </Link>

        <Link to="/dashboard/cars">
          <Button variant="ghost" className="px-4 w-[240px] justify-between ">
            <div className="flex items-center">
              <Car className="mr-3" size="16" />
              <p className=" font-semibold ">All Cars</p>
            </div>
          </Button>
        </Link>

        <Link to="/dashboard/expenses">
          <Button variant="ghost" className="px-4 w-[240px]  justify-between">
            <div className="flex items-center">
              <SquareKanban className="mr-3" size="16" />
              <p className=" font-semibold ">Expense Types</p>
            </div>
          </Button>
        </Link>

        <Link to="/dashboard/archives">
          <Button variant="ghost" className="px-4 w-[240px]  justify-between">
            <div className="flex items-center">
              <Archive className="mr-3" size="16" />
              <p className=" font-semibold ">Archives</p>
            </div>
          </Button>
        </Link>
      </div>

      <h3 className="font-semibold text-lg mb-4 ml-2">Settings</h3>

      <div className="flex flex-col gap-1">
        <Link to="/dashboard/settings">
          <Button variant="ghost" className="px-4 w-[240px] justify-start">
            <Settings className="mr-3" size="16" />
            <p className=" font-semibold ">Settings</p>
          </Button>
        </Link>

        <Button variant="destructive" className="px-4 w-[240px] justify-start">
          <LogOut className="mr-3" size="16" />
          <p className=" font-semibold">Log Out</p>
        </Button>
      </div>
    </div>
  );
}
