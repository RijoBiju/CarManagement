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

const basicFormSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce.number().min(1600),
  plate: z.string().length(7),
  miles: z.coerce.number().min(0, {
    message: "Miles should be zero or more",
  }),
});

export default function BasicForm() {
  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: 0,
      plate: "",
      miles: 0,
    },
  });

  function onSubmit(data: z.infer<typeof basicFormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Basic Details</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand of the Vehicle" {...field} />
                  </FormControl>{" "}
                  <FormMessage />
                  <div className="space-y-1 leading-none"></div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Model</FormLabel>
                  <FormControl>
                    <Input placeholder="Model of the Vehicle" {...field} />
                  </FormControl>{" "}
                  <FormMessage />
                  <div className="space-y-1 leading-none"></div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plate"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Plate</FormLabel>
                  <FormControl>
                    <Input placeholder="Plate of the Vehicle" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="space-y-1 leading-none"></div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Year of Manufacture</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Year of the Manufacture"
                      type="number"
                      {...field}
                    />
                  </FormControl>{" "}
                  <FormMessage />
                  <div className="space-y-1 leading-none"></div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="miles"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Mileage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Number of miles travelled"
                      {...field}
                      type="number"
                    />
                  </FormControl>{" "}
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
