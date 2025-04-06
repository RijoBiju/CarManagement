import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
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
  {
    expenseName: "Item",
  },
];

export default function ExpensesPage() {
  return (
    <div className="py-10 px-16">
      <h1 className="text-2xl font-bold mb-4">Expenses and Types</h1>

      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>Manage Expense Types</CardTitle>
          <CardDescription>
            You have a total of 5 expense types. Contact admins to add more
          </CardDescription>
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
      </Card>
    </div>
  );
}
