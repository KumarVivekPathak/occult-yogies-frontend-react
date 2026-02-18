import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePassword } from "../../service/APIFunctions";


const formSchema = z.object({
    oldPassword: z.string().min(1, { message: "Old Password is required." }),
    newPassword: z.string().min(1, { message: "New Password is required." }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required." }),
  });

const ChangePassword : React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
      });
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        const body = {
          current_password: values.oldPassword,
          new_password: values.newPassword,
          new_password_confirmation: values.confirmPassword
        }
        try{
          const response = await updatePassword(body);
          console.log("Password updated successfully", response);
        }catch(error){
          console.log("Password update failed", error);
        }
      
      }
    return(
        <div className="w-11/12 flex flex-col py-10 font-roboto">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-purple font-roboto uppercase">Change Password</h1>
        <hr className="my-3 w-full mx-auto border-darkPurple border-1 " />

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-2 text-black">
               
            <div className="flex flex-row gap-6" >
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-1/2">
                    <FormLabel className="w-1/2">Old Password <span className="text-red-500">*</span></FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Old Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            

            
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-1/2">
                    <FormLabel className="w-1/2">New Password :</FormLabel>
                      <FormControl className="w-full ">
                        <Input
                          placeholder="New Password"
                          type="password"
                          {...field}  
                        />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
            </div>

            <div className="flex flex-row gap-6 w-full mx-auto" >
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 w-1/2 pr-2">
                    <FormLabel className="w-1/2 ">Confirm Password <span className="text-red-500">*</span></FormLabel>
                    <FormControl className="w-full ">
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            
            </div>

            <hr className="my-3 w-full mx-auto border-darkPurple border-1 " />

            <div className="flex flex-row gap-2 w-2/5 justify-center items-center mx-auto">    
            <Button type="submit" className="w-1/2 bg-buttonHover hover:bg-button text-darkPurple hover:text-purple text-lg font-medium font-roboto">Update Password</Button>
            <Button className="w-1/2 hover:bg-buttonRedHover bg-buttonRed text-white  text-lg font-medium" onClick={() => form.reset()}>Reset</Button>
            </div>

            </form>
        </Form>

        </div>
    )
}

export default ChangePassword;
