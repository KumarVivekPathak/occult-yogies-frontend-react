import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import {
  updateMobileNumerologyReport,
  updateAdvanceMobileNumerologyReport,
  generateMobileNumerologyReport,
  generateAdvanceMobileNumerologyReport,
  getAdvanceMobileNumerologyReportData,
} from "../../service/APIFunctions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import CustomLoader from "@/src/components/CustomLoader";
import type { MobileAnalysisFormDTO } from "@/src/service/types";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required." }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select a gender",
  }),
  birthDate: z
    .string()
    .min(1, { message: "Birth date is required." })
    .refine(
      (val) => {
        // Validate date format DD/MM/YYYY
        return /^\d{2}\/\d{2}\/\d{4}$/.test(val);
      },
      {
        message: "Date must be in DD/MM/YYYY format",
      }
    ),
  email: z.string().email({ message: "Invalid email address." }),
  mobileNumber: z.string().min(1, { message: "Mobile number is required." }),
  areaOfStruggle: z.array(z.number()).optional(),
});

type Mode = "basic" | "advanced";

interface MobileAnalysisProps {
  onGenerateSuggestions?: (data: any) => void;
  mode?: Mode;
  reportId?: number; // For edit mode
}

const MobileAnalysis: React.FC<MobileAnalysisProps> = ({
  onGenerateSuggestions,
  mode = "basic",
  reportId,
}) => {
  const [isLoadingData, setIsLoadingData] = useState(!!reportId);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedAreaOfStruggle, setSelectedAreaOfStruggle] = useState<
    number[]
  >([]);
  const areaOfStruggleOptions = [
    { id: 1, name: "Career" },
    { id: 2, name: "Health" },
    { id: 3, name: "Relationships" },
    { id: 4, name: "Job" },
    { id: 5, name: "Faimily" },
  ];
  const toggleOption = (id: number) => {
    const newSelection = selectedAreaOfStruggle.includes(id)
      ? selectedAreaOfStruggle.filter((item: number) => item !== id)
      : [...selectedAreaOfStruggle, id];

    setSelectedAreaOfStruggle(newSelection);
    form.setValue("areaOfStruggle", newSelection);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: undefined,
      birthDate: "",
      mobileNumber: "",
      email: "",
      areaOfStruggle: [],
    },
  });

  useEffect(() => {
    const fetchReportData = async () => {
      if (!reportId) return;

      try {
        const response = await getAdvanceMobileNumerologyReportData(reportId);
        const reportData = response.data.record;
        console.log("Report data for the edit prepopulte:", reportData);
        form.reset({
          firstName: reportData.first_name || "",
          middleName: reportData.middle_name || "",
          lastName: reportData.last_name || "",
          gender: reportData.gender,
          birthDate: reportData.date_of_birth || "",
          mobileNumber: reportData.mobile_no || "",
          email: reportData.email || "",
          areaOfStruggle: reportData.area_of_struggle || [],
        });

        if (reportData.area_of_struggle) {
          setSelectedAreaOfStruggle(reportData.area_of_struggle);
        }

        if (reportData.date_of_birth) {
          setStartDate(new Date(reportData.date_of_birth));
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
        console.error("Error generating suggestions:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchReportData();
  }, [reportId, mode, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    if (onGenerateSuggestions) {
      try {
        setIsLoading(true);
        const body: MobileAnalysisFormDTO = {
          firstName: values.firstName,
          lastName: values.lastName,
          middleName: values.middleName,
          mobileNo: values.mobileNumber,
          countryCode: "91",
          dateOFBirth: values.birthDate.split("/").reverse().join("-"),
          gender: values.gender,
          emailId: values.email,
          areaOfStruggle: values.areaOfStruggle,
        };

        let response;
        console.log("Body for the mobile analysis:", body);

        if (mode === "advanced") {
          if (reportId) {
            response = await updateAdvanceMobileNumerologyReport(
              reportId,
              body
            );
            toast.success("Report updated successfully");
          } else {
            response = await generateAdvanceMobileNumerologyReport(body);
          }
        } else {
          if (reportId) {
            // currenly just to show will implement later
            response = await updateMobileNumerologyReport(reportId, body);
          } else {
            response = await generateMobileNumerologyReport(body);
          }
        }

        const responseData = response.data;
        onGenerateSuggestions(responseData);
      } catch (error) {
        console.error("Generate mobile numerology report failed:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    form.reset({
      firstName: "",
      middleName: "",
      lastName: "",
      gender: undefined,
      birthDate: "",
      mobileNumber: "",
      email: "",
      areaOfStruggle: [],
    });
    setSelectedAreaOfStruggle([]);
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    const dateString = date ? formatDate(date) : "";
    form.setValue("birthDate", dateString, { shouldValidate: true });
  };

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center p-8">
        Loading report data...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-11/12 bg-grey font-roboto p-4 sm:p-6 md:p-8 rounded-xl outline-12 outline-textYellow">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-purple text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase">
        Mobile Numerology Analysis
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-2 "
        >
          <div className="flex flex-col gap-2 sm:gap-6 text-black">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full xs:w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" type="text" {...field} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem className="w-full xs:w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Middle Name" type="text" {...field} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 w-full">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full xs:w-1/2 flex flex-col justify-start items-start">
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
                  <FormItem className="w-full xs:w-1/2 flex flex-col justify-start items-start">
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 w-full">
              <FormField
                control={form.control}
                name="birthDate"
                render={() => (
                  <FormItem className="w-full xs:w-1/2 flex flex-col justify-start items-start">
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
                  <FormItem className="w-full xs:w-1/2 flex flex-col justify-start items-start">
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full xs:w-1/2 flex flex-col justify-start items-start">
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

              <div className="w-full xs:w-1/2 space-y-4 ">
                <FormLabel className="">Area Of Struggle</FormLabel>
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  {areaOfStruggleOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={option.id.toString()}
                        checked={selectedAreaOfStruggle.includes(option.id)}
                        onCheckedChange={() => toggleOption(option.id)}
                        className="
                          w-5 h-5 rounded-md border-2 
                          border-purple bg-white text-purple
                          data-[state=checked]:bg-purple 
                          data-[state=checked]:border-purple 
                          data-[state=checked]:text-white 
                          focus-visible:ring-purple
                          focus-visible:border-purple
                          dark:bg-transparent
                          dark:border-purple
                          dark:data-[state=checked]:bg-purple
                          dark:data-[state=checked]:text-white
                          transition-all duration-200"
                      />
                      <Label
                        htmlFor={option.id.toString()}
                        className="text-black font-medium"
                      >
                        {option.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center pt-2 gap-2">
            <Button
              className="w-2/5 sm:w-1/5 hover:bg-buttonRedHover bg-buttonRed text-white text-sm sm:text-lg font-medium"
              type="button"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="w-3/5 sm:w-2/5 bg-buttonHover hover:bg-button text-darkPurple hover:text-purple text-md sm:text-lg font-medium font-roboto flex items-center justify-center gap-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
               <CustomLoader/>
              ) : (
                "Generate Report"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MobileAnalysis;
