import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";

import { useEffect } from "react";

const basicFormSchema = z.object({
  minimumSellingPrice: z.coerce.number(),
  presentMarketValue: z.coerce.number(),
  customerDeliveryFee: z.coerce.number(),
});

interface SettingPriceFormProps {
  defaultValues: {
    carId: number;
    minimumSellingPrice: number;
    presentMarketValue: number;
    customerDeliveryFee: number;
  };
}

export default function SettingPriceForm({
  defaultValues,
}: SettingPriceFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      minimumSellingPrice: defaultValues.minimumSellingPrice || 0,
      presentMarketValue: defaultValues.presentMarketValue || 0,
      customerDeliveryFee: defaultValues.customerDeliveryFee || 0,
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      minimumSellingPrice: defaultValues.minimumSellingPrice || 0,
      presentMarketValue: defaultValues.presentMarketValue || 0,
      customerDeliveryFee: defaultValues.customerDeliveryFee || 0,
    });
  }, [defaultValues, reset]);

  async function onSubmit(data: z.infer<typeof basicFormSchema>) {
    const payload = {
      minimumSellingPrice: data.minimumSellingPrice,
      presentMarketValue: data.presentMarketValue,
      customerDeliveryFee: data.customerDeliveryFee,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/cars/${defaultValues.carId}/selling`,
        {
          method: "PATCH", // Use "PUT" or "PATCH" if updating an existing record
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Pricing details saved:", result);

        toast({
          title: "Saved successfully",
          description: "The pricing details have been updated.",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to save",
          description: errorData.Error || "An error occurred while saving.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving pricing details:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6">Selling price details</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minimumSellingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Selling Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Minimum Selling Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="presentMarketValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Present Market Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Present Market Value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerDeliveryFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Delivery Fee</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer Delivery Fee" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="font-semibold">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
