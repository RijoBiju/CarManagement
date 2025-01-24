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

const basicFormSchema = z.object({
  minimumSellingPrice: z.coerce.number(),
  presentMarketValue: z.coerce.number(),
  customerDeliveryFee: z.coerce.number(),
});

export default function SettingPriceForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      minimumSellingPrice: 0,
      presentMarketValue: 0,
      customerDeliveryFee: 0,
    },
  });

  function onSubmit(data: z.infer<typeof basicFormSchema>) {
    console.log(data);

    toast({
      title: "Saved successfully",
    });
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
                <FormItem className="">
                  <FormLabel className="">Minimum selling price</FormLabel>
                  <FormControl>
                    <Input placeholder="Minimum selling price" {...field} />
                  </FormControl>{" "}
                  <FormMessage />
                  <div className="space-y-1 leading-none"></div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="presentMarketValue"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Present market value</FormLabel>
                  <FormControl>
                    <Input placeholder="Present market value" {...field} />
                  </FormControl>{" "}
                  <FormMessage />
                  <div className="space-y-1 leading-none"></div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerDeliveryFee"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Customer Delivery Fee</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer Delivery Fee" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="space-y-1 leading-none"></div>
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
