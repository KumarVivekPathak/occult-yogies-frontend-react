import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPassword } from '../../service/APIFunctions';

interface ForgotPasswordProps {
  onGoToSignIn: () => void;
}

const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required." }).email("Invalid email address."),
});

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onGoToSignIn }) => {
  const [message, setMessage] = useState(''); 

 
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async(values: z.infer<typeof forgotPasswordSchema>) => {
    setMessage('');    
    try {
      const response = await forgotPassword(values.email);
      console.log("Forgot password response:", response);
      setMessage(response.message);
    } catch (error) {
      console.error("Forgot password failed:", error);
      setMessage("Failed to send reset password email.");
    }       
  }

  return (
    <div className="bg-bgYellow font-roboto rounded-4xl p-8 lg:p-12 shadow-lg h-full w-full ">
      <div className="text-center mb-4">
        <h1 className="font-semibold text-purple font-roboto text-2xl ">Forgot Password</h1>
        <p className="font-light text-purple font-roboto text-sm lg:text-lg">Enter your email to reset your password.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem >
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="pr-12 bg-bgYellow focus:ring-purple text-purple font-roboto font-medium h-10 "
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-buttonRedHover text-start" /> 
              </FormItem>
            )}
          />

    
          {message && (
            <p className={`text-sm text-center ${message.includes('success') || message.includes('sent') ? 'text-green-600' : 'text-buttonRedHover'}`}>
              {message}
            </p>
          )}

          <div className="flex justify-between gap-2">
            
            <Button
              type="button"
              variant="outline" 
              onClick={onGoToSignIn}
              className="w-1/2 font-medium text-xl md:text-base hover:text-darkPurple text-purple h-10"
            >
              Back To Sign In
            </Button>

           
            <Button
              type="submit"
              className="w-1/2 font-semibold text-xl md:text-lg bg-button-hover hover:bg-button text-darkPurple hover:text-purple h-10" 
            >
            Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;