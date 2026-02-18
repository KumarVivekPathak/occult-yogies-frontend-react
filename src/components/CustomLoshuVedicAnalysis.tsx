import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import type { LoshuVedicAnalysisFormDTO } from "../service/types";

const formSchema = z.object({
  firstPartnerName: z.string().min(1, { message: "Name is required." }),
  firstDateOfBirth: z
    .string()
    .min(1, { message: "First Date of Birth is required." }),
  secondPartnerName: z.string().min(1, { message: "Name is required." }),
  secondDateOfBirth: z
    .string()
    .min(1, { message: "Second Date of Birth is required." }),
});

interface CustomLoshuVedicAnalysisProps {
  title: string;
  handleSubmit: (formData: LoshuVedicAnalysisFormDTO) => void;
}

const CustomLoshuVedicAnalysis: React.FC<CustomLoshuVedicAnalysisProps> = ({ title,handleSubmit  }) => {
  const [firstDob, setFirstDob] = React.useState<Date | null>(null);
  const [secondDob, setSecondDob] = React.useState<Date | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstPartnerName: "",
      firstDateOfBirth: "",
      secondPartnerName: "",
      secondDateOfBirth: "",
    },
  });

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFirstDateChange = (date: Date | null) => {
    setFirstDob(date);
    const dateString = date ? formatDate(date) : "";
    form.setValue("firstDateOfBirth", dateString, { shouldValidate: true });
  };

  const handleSecondDateChange = (date: Date | null) => {
    setSecondDob(date);
    const dateString = date ? formatDate(date) : "";
    form.setValue("secondDateOfBirth", dateString, { shouldValidate: true });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleSubmit(values);
  };

  const resetForm = () => {
    form.reset();
    setFirstDob(null);
    setSecondDob(null);
  };

  return (
    <div className="flex bg-grey w-full max-w-4xl font-roboto flex-col justify-center items-center p-10 rounded-xl outline outline-12 outline-textYellow">
     <h1 className="text-purple text-4xl font-extrabold uppercase">{title}</h1>
     <hr className="my-3 w-full mx-auto border-darkPurple border-1 " />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-2 text-black"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <FormField
              control={form.control}
              name="firstPartnerName"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-1/2">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    First Partner Name <span className="text-red-500">*</span>{" "}
                    :
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    <FormControl className="w-full">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                    </div>
                </FormItem>
              )}
            />

            {/* Birth Date Field */}
            <FormField
              control={form.control}
              name="firstDateOfBirth"
              render={() => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-1/2">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                   First Partner Birth Date <span className="text-red-500">*</span> :
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                  <FormControl className="flex flex-1 min-w-full">
                      <DatePicker
                        selected={firstDob}
                        onChange={handleFirstDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                    </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full">
            <FormField
              control={form.control}
              name="secondPartnerName"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-1/2">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    Second Partner Name <span className="text-red-500">*</span>{" "}
                    :
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                  <FormControl className="w-full">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                    </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secondDateOfBirth"
              render={() => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-1/2">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                   Second Partner Birth Date <span className="text-red-500">*</span> :
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                  <FormControl className="flex flex-1 min-w-full">
                      <DatePicker
                        selected={secondDob}
                        onChange={handleSecondDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                    </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center gap-2">
          <Button type="submit" className="w-1/5 bg-buttonHover hover:bg-button text-darkPurple hover:text-purple text-lg font-medium font-roboto flex items-center justify-center gap-2">Submit</Button>
          <Button type="button" onClick={resetForm} className="w-1/5 hover:bg-buttonRedHover bg-buttonRed text-white  text-lg font-medium">Reset</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomLoshuVedicAnalysis;
