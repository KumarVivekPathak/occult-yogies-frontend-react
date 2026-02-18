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
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generateReport } from "../../service/APIFunctions";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required." }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Please select a gender",
  }),
  spouseName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  birthDate: z.string().min(1, { message: "Birth date is required." }),
  mobileNumber: z.string().min(1, { message: "Mobile number is required." }),
  fathersName: z.string().optional(),
  mothersName: z.string().optional(),
});

interface NameAnalysisProps {
  onGenerateSuggestions?: (id: number) => void;
}


const NameAnalysis : React.FC<NameAnalysisProps> = ({ onGenerateSuggestions }: NameAnalysisProps) => {
  const [generalError, setGeneralError] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: undefined,
      birthDate: "",
      mobileNumber: "",
      fathersName: "",
      mothersName: "",
      spouseName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const fullName = `${values.firstName} ${values.middleName || ""} ${
      values.lastName
    }`.trim();
    const body = {
      fullname: fullName,
      email: values.email,
      dob: values.birthDate,
      gender: values.gender?.toLowerCase(),
      fathers_name: values.fathersName,
      mothers_name: values.mothersName,
      spouse_name: values.spouseName,
      mobile: values.mobileNumber,
    };
    try {
      const response = await generateReport(body);
      toast.success("Report generated successfully");

      const responseID = response.id;

      console.log(
        "Report generated successfully",
        response,
        "\n\n\n ",
        response.id
      );
      if (onGenerateSuggestions && responseID) {
        onGenerateSuggestions(responseID);
      } else if (!responseID) {
        console.error("No report ID returned from API");
      }
    } catch (error) {
      console.log("Report generation failed", error);
      toast.error("Failed to generate report. Please try again.");
    } finally {
      setIsLoading(false);
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
      fathersName: "",
      mothersName: "",
      spouseName: "",
      email: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-grey font-roboto p-4 sm:p-6 md:p-8 rounded-xl outline-12 outline-textYellow">
      <h1 className="text-purple text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase">
        Name Numerology Analysis
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1 " />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-2"
        >
          <div className="flex flex-col gap-2 sm:gap-6 text-black ">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className=" w-full xs:w-1/2 flex flex-col justify-start items-start">
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
                  <FormItem className="w-full sm:w-1/2 flex flex-col justify-start items-start">
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
                  <FormItem className="w-full sm:w-1/2 flex flex-col justify-start items-start">
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
                          <SelectItem value="MALE" className="text-black border-b rounded-none border-black">Male</SelectItem>
                          <SelectItem value="FEMALE" className="text-black border-b rounded-none border-black">Female</SelectItem>
                          <SelectItem value="OTHER" className="text-black rounded-none ">Other</SelectItem>
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
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>
                      Birth Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="w-full">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          field.onChange(date?.toISOString().split("T")[0]);
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <FormItem className="w-full sm:w-1/2 flex flex-col justify-start items-start">
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
                name="fathersName"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>Father's Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Father's Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mothersName"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>Mother's Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mother's Name"
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
                name="spouseName"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2 flex flex-col justify-start items-start">
                    <FormLabel>Spouse Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Spouse Name" type="text" {...field} />
                    </FormControl>
                    <FormMessage className="text-buttonRedHover" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2 flex flex-col justify-start items-start">
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
                <>
                  <TailSpin
                    height="30"
                    width="30"
                    color={'purple'}
                    ariaLabel="loading"
                  />
                  Loading...
                </>
              ) : (
                "Generate Suggestions"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NameAnalysis;
