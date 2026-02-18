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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserProfile } from "../../service/APIFunctions";
import { useUser } from "../../context/userContext";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobileNumber: z
    .string()
    .min(10, { message: "Mobile number must be 10 digits." })
    .max(10, { message: "Mobile number must be 10 digits." })
    .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  creationDate: z.string().min(1, { message: "Creation date is required." }),
});

const ProfileChange : React.FC = () => {
  const { userData } = useUser();
  console.log("user data i ma gettitng is  :: ",userData);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      mobileNumber: userData?.phone || "",
      creationDate: userData?.creationDate
        ? userData.creationDate.split("T")[0]
        : "",
    },
  });

  const getResetValues = () => ({
    name: userData?.name || "",
    email: userData?.email || "",
    mobileNumber: userData?.phone || "",
    creationDate: userData?.creationDate
      ? userData.creationDate.split("T")[0]
      : "",
  });

  useEffect(() => {
    form.reset(getResetValues());
  }, [userData, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const body = {
      name: values.name,
      email: values.email,
      phone: values.mobileNumber,
    };
    try {
      const response = await updateUserProfile(body);
      toast.success("Profile updated successfully");
      console.log("Profile updated successfully", response);
    } catch (error) {
      console.log("Profile update failed", error);
    }
  };

  return (
    <div className="w-11/12 flex flex-col py-10 font-roboto">
      <Toaster position="top-right" reverseOrder={false}/>
      <h1 className=" text-xl sm:text-2xl md:text-4xl font-bold text-darkPurple uppercase">Profile Change</h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1 " />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-2 text-black">
          <div className="flex flex-row gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-row gap-2 w-full">
                  <FormLabel className="flex flex-row gap-2 w-1/2">
                    Name <span className="text-red-500">*</span> :
                  </FormLabel>
                  <FormControl className="w-full ">
                    <Input placeholder="Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-row gap-2 w-full">
                  <FormLabel className="flex flex-row gap-2 w-1/2">Email : </FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-6 w-full ">
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 w-full">
                  <div className="flex flex-row w-full">
                  <FormLabel className="flex flex-row gap-2 w-1/2">Mobile Number <span className="text-red-500">*</span> :</FormLabel>
                  <FormControl className="w-full ">
                    <Input
                      placeholder="Mobile Number"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      minLength={10}
                      {...field}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^0-9]/g, "");
                        field.onChange(input.value);
                      }}
                    />
                  </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="creationDate"
              render={({ field }) => (
                <FormItem className="flex flex-row gap-2 w-full">
                  <FormLabel className="flex flex-row gap-2 w-1/2">Creation Date :</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="Creation Date" type="date" {...field} className="w-full"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <hr className="my-3 w-full mx-auto border-darkPurple border-1 " />

          <div className="flex flex-row gap-2 w-2/5 justify-center items-center my-5 mx-auto">
            <Button type="submit" className="w-1/2 bg-buttonHover hover:bg-button text-darkPurple hover:text-purple text-lg font-medium font-roboto">
              Update Profile
            </Button>
            <Button
              type="button"
              className="w-1/2 hover:bg-buttonRedHover bg-buttonRed text-white  text-lg font-medium"
              onClick={() =>
                form.reset(getResetValues(), {
                  keepErrors: false,
                  keepTouched: false,
                  keepDirty: false,
                })
              }
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileChange;
