import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required." }),
  dateOfBirth: z.string().min(1, { message: "Birth date is required." }),
  gender: z.string().min(1, { message: "Gender is required." }),
  mobileNumber: z.string().min(1, { message: "Mobile number is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  majorArea: z.string().min(1, { message: "Major area is required." }),
  minorArea: z.string().min(1, { message: "Minor area is required." }),
});

// Type definitions for better type safety
export interface FormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  email: string;
  majorArea: string;
  minorArea: string;
}

export interface MajorAreaOption {
  id: number;
  name: string;
}

export interface MinorAreaOption {
  id: number;
  value: string;
}

interface CrystalAnalysisProps {
  title: string;
  initialData?: Partial<FormData>;
  onSubmit?: (data: FormData) => void;
  onReset?: () => void;
  majorAreaOptions?: MajorAreaOption[];
  minorAreaOptions?: MinorAreaOption[];
  submitButtonText?: string;
  showResetButton?: boolean;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

const CrystalAnalysis: React.FC<CrystalAnalysisProps> = ({
  title,
  initialData,
  onSubmit,
  onReset,
  majorAreaOptions,
  minorAreaOptions,
  submitButtonText = "Submit",
  showResetButton = true,
  isLoading = false,

}) => {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  
  // Default data - you can move this to a separate file or constants
  const defaultMinorAreaData: MinorAreaOption[] = minorAreaOptions || [
    { id: 1, value: "Love life" },
    { id: 2, value: "Attraction" },
    { id: 3, value: "Relationships" },
    { id: 4, value: "Money" },
    { id: 5, value: "Partner" },
  ];

  const defaultMajorAreaData: MajorAreaOption[] = majorAreaOptions || [
    { id: 1, name: "Physical" },
    { id: 2, name: "Emotional" },
    { id: 3, name: "Relationships" },
    { id: 4, name: "Money" },
    { id: 5, name: "Partner" },
  ];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      middleName: initialData?.middleName || "",
      lastName: initialData?.lastName || "",
      dateOfBirth: initialData?.dateOfBirth || "",
      gender: initialData?.gender || undefined,
      mobileNumber: initialData?.mobileNumber || "",
      email: initialData?.email || "",
      majorArea: initialData?.majorArea || undefined,
      minorArea: initialData?.minorArea || undefined,
    },
  });

  // Effect to handle initial data changes (useful for async data loading)
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        const value = initialData[key as keyof FormData];
        if (value !== undefined) {
          form.setValue(key as keyof FormData, value);
        }
      });

      // Handle date of birth specifically
      if (initialData.dateOfBirth) {
        const parsedDate = parseDate(initialData.dateOfBirth);
        setDateOfBirth(parsedDate);
      }
    }
  }, [initialData, form]);

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    
    // Assuming format is DD/MM/YYYY
    const [day, month, year] = dateString.split('/').map(num => parseInt(num, 10));
    if (day && month && year) {
      return new Date(year, month - 1, day);
    }
    return null;
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (onSubmit) {
      onSubmit(data as FormData);
    } else {
      console.log(data);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date);
    const dateString = date ? formatDate(date) : "";
    form.setValue("dateOfBirth", dateString, { shouldValidate: true });
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleReset = () => {
    form.reset();
    setDateOfBirth(null);
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-grey font-roboto p-4 sm:p-6 md:p-8 rounded-xl outline-12 outline-textYellow">
      <h1 className="text-purple text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase">
        {title}
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border " />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6 mt-2 text-black"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row md:items-center gap-2 w-full ">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    First Name <span className="text-red-500">*</span> :
                  </FormLabel>
                  <div className="w-full flex flex-col gap-2">
                    <FormControl className="w-full">
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover text-xs mt-1 text-start" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row md:items-center gap-2 w-full ">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    Middle Name :
                  </FormLabel>
                  <div className="w-full flex flex-col gap-2">
                    <FormControl className="w-full">
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover text-xs mt-1 text-start" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row md:items-center gap-2 w-full">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    Last Name <span className="text-red-500">*</span> :
                  </FormLabel>
                  <div className="w-full flex flex-col gap-2">
                    <FormControl className="w-full">
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover text-xs mt-1 text-start" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={() => (
                <FormItem className="flex flex-col sm:flex-row md:items-center gap-2 w-full">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    Date of Birth <span className="text-red-500">*</span> :
                  </FormLabel>
                  <div className="w-full flex flex-col gap-2">
                    <FormControl className="flex flex-1 min-w-full">
                      <DatePicker
                        selected={dateOfBirth}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover text-xs mt-1 text-start" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row md:items-center gap-2 w-full">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    Mobile Number <span className="text-red-500">*</span> :
                  </FormLabel>
                  <div className="w-full flex flex-col gap-2">
                    <FormControl className="w-full">
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover text-xs mt-1 text-start" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row md:items-center gap-2 w-full">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    Gender <span className="text-red-500">*</span> :
                  </FormLabel>
                  <div className="w-full flex flex-col gap-2">
                    <FormControl>
                      <Select
                        key={field.value}
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isLoading}
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
                    <FormMessage className="text-buttonRedHover text-xs mt-1 text-start" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row md:items-center gap-2 w-full">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    Email <span className="text-red-500">*</span> :
                  </FormLabel>
                  <div className="w-full flex flex-col gap-2">
                    <FormControl className="w-full">
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover text-xs mt-1 text-start" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="majorArea"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row md:items-center gap-2 w-full">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    Major Area of Struggle
                    <span className="text-red-500">*</span> :
                  </FormLabel>
                  <div className="w-full flex flex-col gap-2">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value?.toString()}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Area" />
                        </SelectTrigger>
                        <SelectContent className="bg-white p-0">
                          {defaultMajorAreaData.map((area) => (
                            <SelectItem
                              key={area.id}
                              value={area.id.toString()}
                              className="text-black rounded-none border-b border-black"
                            >
                              {area.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-buttonRedHover text-xs mt-1 text-start" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full lg:w-1/2 lg:pr-3">
            <FormField
              control={form.control}
              name="minorArea"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row md:items-center gap-2 w-full ">
                  <FormLabel className="whitespace-nowrap text-sm font-medium w-1/2">
                    Minor Area of Struggle
                    <span className="text-red-500">*</span> :
                  </FormLabel>
                  <div className="w-full flex flex-col gap-2">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value?.toString()}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Area" />
                        </SelectTrigger>
                        <SelectContent className="bg-white p-0">
                          {defaultMinorAreaData.map((area) => (
                            <SelectItem
                              key={area.id}
                              value={area.id.toString()}
                              className="text-black rounded-none border-b border-black"
                            >
                              {area.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-buttonRedHover text-xs mt-1 text-start" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center gap-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-1/5 bg-buttonHover hover:bg-button text-darkPurple hover:text-purple text-sm md:text-base font-medium font-roboto flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? "Loading..." : submitButtonText}
            </Button>
            {showResetButton && (
              <Button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="w-1/5 hover:bg-buttonRedHover bg-buttonRed text-white text-sm md:text-base font-medium disabled:opacity-50"
              >
                Reset
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CrystalAnalysis;