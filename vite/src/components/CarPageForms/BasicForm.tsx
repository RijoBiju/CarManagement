import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast, useToast } from "@/components/ui/use-toast";

import { useEffect } from "react";

const basicFormSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  yearOfManufacture: z.coerce.number().min(1600),
  plate: z.string().length(7),
  mileage: z.coerce.number().min(0, {
    message: "Miles should be zero or more",
  }),
});

interface BasicFormProps {
  defaultValues: {
    carId?: number;
    carBrand: string;
    carModel: string;
    carPlate: string;
    yearOfManufacture?: number;
    mileage?: number;
  };
}

export default function BasicForm({ defaultValues }: BasicFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      brand: defaultValues.carBrand || "",
      model: defaultValues.carModel || "",
      yearOfManufacture: defaultValues.yearOfManufacture || 0,
      plate: defaultValues.carPlate || "",
      mileage: defaultValues.mileage || 0,
    },
  });

  async function onSubmit(data: z.infer<typeof basicFormSchema>) {
    const payload = {
      carBrand: data.brand,
      carModel: data.model,
      carPlate: data.plate,
      yearOfManufacture: data.yearOfManufacture,
      mileage: data.mileage,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/cars/${defaultValues.carId}/basic`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Updated car data:", result);

        toast({
          title: "Saved successfully",
          description: "The car details have been updated.",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to save",
          description: errorData.Error || "An error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating car details:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  }

  const { reset } = form;

  // Update form values when defaultValues changes
  useEffect(() => {
    reset({
      brand: defaultValues.carBrand || "",
      model: defaultValues.carModel || "",
      yearOfManufacture: defaultValues.yearOfManufacture || 0,
      plate: defaultValues.carPlate || "",
      mileage: defaultValues.mileage || 0,
    });
  }, [defaultValues, reset]);

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6">Basic Details</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand of the Vehicle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="Model of the Vehicle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plate</FormLabel>
                  <FormControl>
                    <Input placeholder="Plate of the Vehicle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearOfManufacture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Manufacture</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Year of the Manufacture"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mileage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Number of miles travelled"
                      {...field}
                      type="number"
                    />
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
