import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const expenseTypes = [
  {
    expenseName: "Initial",
  },
  {
    expenseName: "Mechanic",
  },
  {
    expenseName: "Miscellaneous",
  },
];

export default function ExpensesPage() {
  return (
    <div className="py-10 px-16">
      <h1 className="text-2xl font-bold mb-4">Expenses and Types</h1>

      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>Manage Expense Types</CardTitle>
          <CardDescription>You have a total of 5 expense types</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {expenseTypes.map((expenseType, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {expenseType.expenseName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus />
                Add Expense Type
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Expense Type</DialogTitle>
                <DialogDescription>
                  Add a new expense type and an associated color code
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Expense Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Color Code
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <div>
        <h1 className="text-2xl font-bold mb-4">Expense Summary</h1>
      </div>
    </div>
  );
}
