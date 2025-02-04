import { useEffect, useState } from "react";

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
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "../ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_URL } from "@/api";

interface Expense {
  _id: string;
  name: string;
  type: string;
  date: string;
  amount: number;
}

export default function ExpenditureForm({ carId }: { carId: string }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    name: "",
    type: "",
    date: new Date().toISOString().split("T")[0],
    amount: 0,
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/expense/${carId}`);
        const data = await response.json();
        setExpenses(data.data || []);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, [carId]);

  const handleAddExpense = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newExpense, carId }),
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses((prev) => [...prev, data.data]);
      } else {
        console.error("Failed to create expense");
      }
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  return (
    <div className="mt-12">
      <div className="flex items-center mb-8">
        <h3 className="text-xl font-semibold mr-3">Expenditure</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Expense</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Expense</DialogTitle>
              <DialogDescription>
                Add a new expense. Hit save when done
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newExpense.name}
                  onChange={(e) =>
                    setNewExpense((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Expense name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  onValueChange={(value) =>
                    setNewExpense((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an expense type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Expense Types</SelectLabel>
                      <SelectItem value="mechanic">Mechanic</SelectItem>
                      <SelectItem value="initial">Initial</SelectItem>
                      <SelectItem value="misc">Miscellaneous</SelectItem>
                      <SelectItem value="item">Item</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  value={newExpense.date}
                  onChange={(e) =>
                    setNewExpense((prev) => ({ ...prev, date: e.target.value }))
                  }
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense((prev) => ({
                      ...prev,
                      amount: Number(e.target.value),
                    }))
                  }
                  type="number"
                  placeholder="Expense amount"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleAddExpense}
                className="font-semibold"
              >
                Add Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Expenses Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Expense Name</TableHead>
            <TableHead>Expense Type</TableHead>
            <TableHead>Date of Expense</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell>
                <Badge>{expense.type}</Badge>
              </TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell className="text-right">${expense.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              ${expenses.reduce((sum, expense) => sum + expense.amount, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
