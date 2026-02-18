import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required." }),
  gender: z.string().min(1, { message: "Gender is required." }),
  dateOfBirth: z.string().min(1, { message: "Birth date is required." }),
  mobileNumber: z.string().min(1, { message: "Mobile number is required." }),
  email: z.string().email({ message: "Invalid email address." }),
});

const LoshuGridAnalysis: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: undefined,
      dateOfBirth: "",
      mobileNumber: "",
      email: "",
    },
  });

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    const dateString = date ? formatDate(date) : "";
    form.setValue("dateOfBirth", dateString, { shouldValidate: true });
  };

  const resetForm = () => {
    form.reset();
    setStartDate(null);
  };

  const onSubmit = () => {
    console.log("Form submitted");
  };

  return (
    <div className="flex bg-grey w-full max-w-4xl font-roboto flex-col justify-center items-center p-10 rounded-xl outline outline-12 outline-textYellow z-2 ">
      <h1 className="text-purple text-4xl font-extrabold uppercase">
        Loshu Grid Analysis
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1 " />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-2 "
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-10 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-10 w-full">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" type="text" {...field} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>
                      Gender <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-white p-0">
                          <SelectItem
                            value="Male"
                            className="text-black rounded-none border-b border-black"
                          >
                            Male
                          </SelectItem>
                          <SelectItem
                            value="Female"
                            className="text-black rounded-none border-b border-black"
                          >
                            Female
                          </SelectItem>
                          <SelectItem
                            value="Other"
                            className="text-black rounded-none "
                          >
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-buttonRedHover" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-10 w-full">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={() => (
                  <FormItem className="w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>
                      Birth Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        wrapperClassName="w-full"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()}
                      />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>
                      Mobile Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mobile Number"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-1/2 md:pr-5 flex flex-col justify-start items-start">
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="text" {...field} />
                  </FormControl>
                  <FormMessage className="text-buttonRedHover" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center pt-2 gap-2">
            <Button
              type="submit"
              className="w-2/5 bg-buttonHover hover:bg-button text-darkPurple hover:text-purple text-lg font-medium font-roboto flex items-center justify-center gap-2"
            >
              Submit
            </Button>
            <Button
              onClick={resetForm}
              type="button"
              className="w-1/5 hover:bg-buttonRedHover bg-buttonRed text-white  text-lg font-medium"
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoshuGridAnalysis;
