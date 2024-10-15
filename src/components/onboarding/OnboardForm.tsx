"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CATEGORIES } from "@/lib/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, InfoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  selects: z.string().array().length(3),
});

const OnboardForm = () => {
  const FoodTags = CATEGORIES;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selects: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values submitted:  ", values);
  }
  const handleSelect = (tag: string) => {
    const currentValue = form.getValues("selects");
    if (currentValue.includes(tag)) {
      form.setValue(
        "selects",
        currentValue.filter((t) => t !== tag)
      );
    } else {
      form.setValue("selects", [...currentValue, tag]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="selects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Select 3 food tags that interest you
                <span className="ml-1 text-xs text-gray-500">(3 required)</span>
              </FormLabel>
              <div className="mt-2 flex flex-wrap gap-2" id="food-tags">
                {FoodTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSelect(tag)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ${
                      field.value.includes(tag)
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-pressed={field.value.includes(tag)}
                  >
                    {tag}
                    {field.value.includes(tag) && (
                      <CheckIcon className="ml-1 h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
              <FormDescription className="flex flex-row items-center">
                <InfoIcon
                  className="h-5 w-5 text-green-500"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Your selections help us customize your feed
                </span>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormMessage />
        <Button
          type="submit"
          className={`w-full py-2 px-4 border border-transparent text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
        >
          Continue
        </Button>
        <div className="mt-4">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Step 1 of 1</span>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default OnboardForm;
