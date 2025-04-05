import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function ProfitCalculator({
  totalExpenditure = 15000,
  sellingPrice = 20000,
}) {
  const [profitPercentage, setProfitPercentage] = useState(
    ((sellingPrice - totalExpenditure) / totalExpenditure) * 100
  );

  const handleSliderChange = (value: number) => {
    setProfitPercentage(value);
  };

  const calculateSellingPrice = () => {
    return totalExpenditure * (1 + profitPercentage / 100);
  };

  const profitAmount = calculateSellingPrice() - totalExpenditure;

  return (
    <div className="bg-white mb-10 mt-12">
      <h2 className="text-xl font-semibold mb-4">Profit Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Profit Percentage: {profitPercentage.toFixed(1)}%
            </label>
            <Slider
              min={0}
              max={100}
              step={0.5}
              value={[profitPercentage]}
              onValueChange={(value) => handleSliderChange(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Profit Amount:</span>
              <span>${profitAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Expenditure:</span>
              <span className="font-medium">
                ${totalExpenditure.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Selling Price:</span>
              <span className="font-medium">
                ${calculateSellingPrice().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
