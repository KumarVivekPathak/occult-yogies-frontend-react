import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./signIn.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "../../service/APIFunctions";
import { FiEye, FiEyeOff } from "react-icons/fi";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Invalid email address."),
  password: z.string().min(1, { message: "Password is required." }),
});

interface SignInProps {
  onForgotPassword?: () => void;
}

declare namespace google {
  namespace translate {
    interface TranslateElementOptions {
      pageLanguage: string;
      includedLanguages: string;
      layout: typeof InlineLayout;
    }

    enum InlineLayout {
      HORIZONTAL = "HORIZONTAL",
    }

    class TranslateElement {
      constructor(options: TranslateElementOptions, targetId: string);
    }
  }
}

interface Window {
  google: {
    translate: typeof google.translate;
  };
}

const SignIn: React.FC<SignInProps> = ({ onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    try {
      const response = await login(values.email, values.password);
      const token = response.data.access_token;
      console.log("Token : ", response);
      Cookies.set("authToken", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      console.log("Login successful, token saved to cookies");

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setGeneralError("Invalid email or password.");
    }
  }

  useEffect(() => {
    const clearWidget = () => {
      const el = document.getElementById("google_translate_element");
      if (el) el.innerHTML = "";
    };

    (window as any).googleTranslateElementInit = () => {
      clearWidget();
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,es",
            layout: (window.google.translate.TranslateElement as any)
              .InlineLayout.HORIZONTAL,
          },
          "google_translate_element"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      (window as any).googleTranslateElementInit();
    }

    return () => {
      clearWidget();
      delete (window as any).googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="relative bg-bgYellow font-roboto rounded-4xl p-8 shadow-lg ">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-4xl md:text-2xl lg:text-3xl font-bold text-darkPurple mb-2">
          Occult Yogis
        </h1>
        <p className="font-normal text-purple font-roboto text-xl lg:text-lg">
          Sign In{" "}
        </p>
      </div>

      {/* Form Start */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="pr-12 bg-bgYellow focus:ring-purple text-purple font-roboto font-medium h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="pr-12 bg-bgYellow focus:ring-purple text-purple font-roboto font-medium h-10"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute bg-button hover:bg-button-hover right-0.5 top-1/2 -translate-y-1/2 h-8 w-8 text-darkPurple hover:text-purple"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEye size={18} />
                    ) : (
                      <FiEyeOff size={18} />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm md:text-md text-purple font-roboto font-medium hover:underline"
              onClick={(e) => {
                e.preventDefault();
                onForgotPassword?.();
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Google Translate */}
          <div
            id="google_translate_element"
            className="mb-2 w-full flex flex-row justify-center items-center gap-2 bg-gray-100 rounded-lg px-3 py-2"
          ></div>

          {/* Error Message */}
          {generalError && (
            <p className="text-buttonRedHover text-sm text-center">{generalError}</p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              className="w-full md:w-3/4 font-semibold text-xl md:text-lg bg-button-hover hover:bg-button text-darkPurple hover:text-purple h-10"
            >
              Log In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
