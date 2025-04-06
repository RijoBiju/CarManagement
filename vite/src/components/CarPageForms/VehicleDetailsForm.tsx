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
import { BASE_URL } from "@/api";

const vehicleDetailsFormSchema = z.object({
  lotNumber: z.string().min(1),
  vin: z.string().min(1),
  titleCode: z.string().min(1),
  odometer: z.string().min(1),
  primaryDamage: z.string().min(1),
  secondaryDamage: z.string().min(1).optional(),
  estimatedRetailValue: z.string().min(1),
  cylinders: z.coerce.number().min(1),
  color: z.string().min(1),
  engineType: z.string().min(1),
  transmission: z.string().min(1),
  drive: z.string().min(1),
  vehicleType: z.string().min(1),
  fuel: z.string().min(1),
  keys: z.boolean(),
  highlights: z.string().min(1).optional(),
});

interface VehicleDetailsProps {
  defaultValues: {
    carId: number;
    lotNumber: string;
    vin: string;
    titleCode: string;
    odometer: string;
    primaryDamage: string;
    secondaryDamage?: string;
    estimatedRetailValue: string;
    cylinders: number;
    color: string;
    engineType: string;
    transmission: string;
    drive: string;
    vehicleType: string;
    fuel: string;
    keys: boolean;
    highlights?: string;
  };
}

export default function VehicleDetailsForm({
  defaultValues,
}: VehicleDetailsProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof vehicleDetailsFormSchema>>({
    resolver: zodResolver(vehicleDetailsFormSchema),
    defaultValues: {
      lotNumber: defaultValues.lotNumber || "",
      vin: defaultValues.vin || "",
      titleCode: defaultValues.titleCode || "",
      odometer: defaultValues.odometer || "",
      primaryDamage: defaultValues.primaryDamage || "",
      secondaryDamage: defaultValues.secondaryDamage || "",
      estimatedRetailValue: defaultValues.estimatedRetailValue || "",
      cylinders: defaultValues.cylinders || 0,
      color: defaultValues.color || "",
      engineType: defaultValues.engineType || "",
      transmission: defaultValues.transmission || "",
      drive: defaultValues.drive || "",
      vehicleType: defaultValues.vehicleType || "",
      fuel: defaultValues.fuel || "",
      keys: defaultValues.keys || false,
      highlights: defaultValues.highlights || "",
    },
  });

  async function onSubmit(data: z.infer<typeof vehicleDetailsFormSchema>) {
    const payload = {
      lotNumber: data.lotNumber,
      vin: data.vin,
      titleCode: data.titleCode,
      odometer: data.odometer,
      primaryDamage: data.primaryDamage,
      secondaryDamage: data.secondaryDamage,
      estimatedRetailValue: data.estimatedRetailValue,
      cylinders: data.cylinders,
      color: data.color,
      engineType: data.engineType,
      transmission: data.transmission,
      drive: data.drive,
      vehicleType: data.vehicleType,
      fuel: data.fuel,
      keys: data.keys,
      highlights: data.highlights,
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/cars/${defaultValues.carId}/vehicle-details`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
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
      lotNumber: defaultValues.lotNumber || "",
      vin: defaultValues.vin || "",
      titleCode: defaultValues.titleCode || "",
      odometer: defaultValues.odometer || "",
      primaryDamage: defaultValues.primaryDamage || "",
      secondaryDamage: defaultValues.secondaryDamage || "",
      estimatedRetailValue: defaultValues.estimatedRetailValue || "",
      cylinders: defaultValues.cylinders || 0,
      color: defaultValues.color || "",
      engineType: defaultValues.engineType || "",
      transmission: defaultValues.transmission || "",
      drive: defaultValues.drive || "",
      vehicleType: defaultValues.vehicleType || "",
      fuel: defaultValues.fuel || "",
      keys: defaultValues.keys || false,
      highlights: defaultValues.highlights || "",
    });
  }, [defaultValues, reset]);

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6">Vehicle details</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="lotNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lot Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Lot Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VIN</FormLabel>
                  <FormControl>
                    <Input placeholder="VIN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="titleCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Title Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="odometer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Odometer</FormLabel>
                  <FormControl>
                    <Input placeholder="Odometer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="primaryDamage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Damage</FormLabel>
                  <FormControl>
                    <Input placeholder="Primary Damage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secondaryDamage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Damage</FormLabel>
                  <FormControl>
                    <Input placeholder="Secondary Damage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedRetailValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Retail Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Estimated Retail Value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cylinders"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cylinders</FormLabel>
                  <FormControl>
                    <Input placeholder="Cylinders" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="engineType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engine Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Engine Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transmission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transmission</FormLabel>
                  <FormControl>
                    <Input placeholder="Transmission" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="drive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drive</FormLabel>
                  <FormControl>
                    <Input placeholder="Drive" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Vehicle Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fuel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel</FormLabel>
                  <FormControl>
                    <Input placeholder="Fuel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="keys"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keys</FormLabel>
                  <FormControl>
                    <Input type="checkbox" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="highlights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highlights</FormLabel>
                  <FormControl>
                    <Input placeholder="Highlights" {...field} />
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
