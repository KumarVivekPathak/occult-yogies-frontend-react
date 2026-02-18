import React, { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createVedicSwitchWord,
  getVedicSwitchWordCategories,
} from "../../service/APIFunctions";
import type {
  VedicSwitchWordBodyDTO,
  VedicSwitchWordCategoriesDTO,
} from "../../service/types";
import toast from "react-hot-toast";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Please, Enter First name." }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Please, Enter Last name." }),
  gender: z.string().min(1, { message: "Please, Select Gender." }),
  dateOfBirth: z.string().min(1, { message: "Please, Select Birth date." }),
  mobileNumber: z.string().min(1, { message: "Please, Enter Mobile number." }),
  email: z.string().email({ message: "Please, Enter Valid Email address." }),
  majorArea: z
    .string()
    .min(1, { message: "Please, Select Major Area of Struggle." }),
  minorArea: z
    .string()
    .min(1, { message: "Please, Select Minor Area of Struggle." }),
});

interface VedicSwitchWordAnalysisProps {
  handleSubmit: () => void;
}

const VedicSwitchWordAnalysis: React.FC<VedicSwitchWordAnalysisProps> = ({
  handleSubmit,
}) => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [majorAreaData, setMajorAreaData] = useState<
    VedicSwitchWordCategoriesDTO[]
  >([]);

  const [minorAreaData, setMinorAreaData] = useState([
    {
      id: 1,
      value: "Love life",
    },
    {
      id: 2,
      value: "Attraction",
    },
    {
      id: 3,
      value: "Relationships",
    },
    {
      id: 4,
      value: "Money",
    },
    {
      id: 5,
      value: "Partner",
    },
  ]);

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
      majorArea: undefined,
      minorArea: undefined,
    },
  });

  useEffect(() => {
    vedicSwitchWordCategories();
  }, []);

  const vedicSwitchWordCategories = async () => {
    try {
      const response = await getVedicSwitchWordCategories();
      const responseData = response?.data;
      console.log("\n\n\n\n Vedic switch word categories:", responseData);
      setMajorAreaData(responseData);
    } catch (error) {
      console.error("Failed to fetch vedic switch word categories:", error);
    }
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (date: Date | null) => {
    setBirthDate(date);
    const dateString = date ? formatDate(date) : "";
    form.setValue("dateOfBirth", dateString, { shouldValidate: true });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitted values:", values);
    const body: VedicSwitchWordBodyDTO = {
      firstName: values.firstName,
      middleName: values.middleName || "",
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth.split("/").reverse().join("-"),
      timeOfBirth: "12:00",
      placeOfBirth: "New York",
      majorArea: values.majorArea || "",
      minorArea: "1",
    };
    try {
      const response = await createVedicSwitchWord(body);
      console.log("Response from createVedicSwitchWord:", response);
      const responseData = response?.data;
      const status = response.success;
      if (status == true) {
        console.log("toast is going to be handledd");
        toast.success("Vedic switch word created successfully");
        handleSubmit();
      } else {
        toast.error("Failed to create vedic switch word");
      }
      console.log("response iss : ", responseData);
    } catch (error) {
      console.error("Failed to create vedic switch word:", error);
    }
  };

  const resetForm = () => {
    form.reset();
    setBirthDate(null);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-grey font-roboto p-4 sm:p-6 md:p-8 rounded-xl outline-12 outline-textYellow">
      <h1 className="text-purple text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase">
        Vedic Switch Word Analysis
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border " />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover text-xs mt-1 text-start" />
                  </div>
                </FormItem>
              )}
            />

            {/* Birth Date Field */}
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
                        selected={birthDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()}
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Area" />
                        </SelectTrigger>
                        <SelectContent className="bg-white p-0">
                          {majorAreaData.map(
                            (area: VedicSwitchWordCategoriesDTO) => {
                              return (
                                <SelectItem
                                  key={area.id}
                                  value={area.id.toString()}
                                  className="text-black rounded-none border-b border-black"
                                >
                                  {area.name}
                                </SelectItem>
                              );
                            }
                          )}
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
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Area" />
                        </SelectTrigger>
                        <SelectContent className="bg-white p-0">
                          {minorAreaData.map((area) => {
                            return (
                              <SelectItem
                                value={area.id.toString()}
                                className="text-black rounded-none border-b border-black"
                              >
                                {area.value}
                              </SelectItem>
                            );
                          })}
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
              className="w-1/5 bg-buttonHover hover:bg-button text-darkPurple hover:text-purple text-sm md:text-base font-medium font-roboto flex items-center justify-center gap-2"
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={resetForm}
              className="w-1/5 hover:bg-buttonRedHover bg-buttonRed text-white text-sm md:text-base font-medium"
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VedicSwitchWordAnalysis;
