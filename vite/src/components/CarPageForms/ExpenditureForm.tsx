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

const expenses = [
  {
    expenseId: 1,
    expenseName: "Oil Change",
    expenseType: "Mechanic",
    expenseAmount: 50,
    dateOfExpense: "2021-09-01",
  },
  {
    expenseId: 2,
    expenseName: "Car Wash",
    expenseType: "Miscellaneous",
    expenseAmount: 20,
    dateOfExpense: "2021-09-01",
  },
  {
    expenseId: 3,
    expenseName: "New Tires",
    expenseType: "Item",
    expenseAmount: 400,
    dateOfExpense: "2021-09-01",
  },
];

export default function ExpenditureForm() {
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
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an expense type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Expense Types</SelectLabel>
                      <SelectItem value="mechanic" className="text-blue-500">
                        Mechanic
                      </SelectItem>
                      <SelectItem value="initial" className="text-red-500">
                        Initial
                      </SelectItem>
                      <SelectItem value="misc" className="text-green-500">
                        Miscellaneous
                      </SelectItem>
                      <SelectItem value="item" className="text-orange-500">
                        Item
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Date
                </Label>
                <Input
                  id="amount"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="col-span-3"
                  type="date"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  defaultValue="@peduarte"
                  className="col-span-3"
                  type="number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add expense</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Expense Name</TableHead>
            <TableHead>Expense Type</TableHead>
            <TableHead>Date of expense</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.expenseId}>
              <TableCell className="font-medium">
                {expense.expenseName}
              </TableCell>
              <TableCell>
                <Badge>{expense.expenseType}</Badge>
              </TableCell>
              <TableCell>{expense.dateOfExpense}</TableCell>
              <TableCell className="text-right">
                {expense.expenseAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
