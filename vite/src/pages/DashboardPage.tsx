import { BASE_URL } from "@/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/dashboard/stats`, {
          credentials: "include",
        });
        const resJson = await response.json();
        setData(resJson);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchStats();
  }, []);

  if (!data) {
    return <p>Loading</p>;
  }

  return (
    <div className="py-10 px-16">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
      <p className="mb-8">Here is your summary</p>

      <div className="grid grid-cols-3 gap-6">
        <div className="border border-gray-300 rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold mb-2">{data.totalCars}</div>
          <div className="text-sm text-gray-500">Total Cars</div>
        </div>

        <div className="border border-gray-300 rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold mb-2">${data.totalExpenses}</div>
          <div className="text-sm text-gray-500">Total Expense Costs</div>
        </div>

        <div className="border border-gray-300 rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold mb-2">
            {data.totalProfits ? `$${data.totalProfits}` : "N/A"}
          </div>
          <div className="text-sm text-gray-500">Total Profits</div>
        </div>
      </div>
    </div>
  );
}
