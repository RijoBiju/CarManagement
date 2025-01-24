import BasicForm from "@/components/CarPageForms/BasicForm";
import ExpenditureForm from "@/components/CarPageForms/ExpenditureForm";
import SellingPriceForm from "@/components/CarPageForms/SellingPriceForm";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function CarPage() {
  return (
    <div className="py-10 px-16">
      <h1 className="text-3xl font-bold mb-10">
        <span className="text-slate-500 mr-5">#32</span>Volkswagon
        <span className="text-sm ml-4">Virtus</span>
      </h1>
      {/* Images section */}

      <h3 className="text-xl font-semibold mb-6">
        Car images
        <Button variant="outline" className="mt-4 ml-4">
          <Upload size="16" className="mr-2" />
          Upload a new image
        </Button>
      </h3>
      <div className="bg-gray-100 p-8 rounded-lg text-gray-500">
        You currently have no images uploaded. Start by adding a couple images!
      </div>

      <BasicForm />
      <ExpenditureForm />
      <SellingPriceForm />
    </div>
  );
}
