import { motion } from "framer-motion";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useLogin } from "@/Services/auth/useAuth";
import { useAuthContext } from "@/Context/AuthContext";
import { Link } from "react-router-dom";



// Props type
interface LoginProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}



// Form schema
const LoginSchema = z.object({
  identifier: z.string().min(3, "Enter your email, phone number, or username")
    .refine(
      (value) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) return true;


        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (usernameRegex.test(value)) return true;


        return false;

      },
      {
        message:
          "Enter a valid email, phone number, or username",
      }
    ),

  password: z.string().min(6, "Password must be at least 6 characters"),

});





export default function Login({ setIsLogin }: LoginProps) {



  // Auth context
  const { loginHandler } = useAuthContext();



  // login mutation
  const { mutate: LoginUser, isPending } = useLogin();



  // form
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: { identifier: "", password: "" },
  });



  // submit
  const OnSubmit = (values: z.infer<typeof LoginSchema>) => {

    const formData = new FormData();

    formData.append("identifier", values.identifier);
    formData.append("password", values.password);


    LoginUser(formData, {

      onSuccess: () => {

        form.reset();

        // to determine if user is new or not
        loginHandler(true);

      },


    });

  }



  return (


    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center bg-black/20 w-full"
    >

      <div className="w-full max-w-7xl bg-transparent text-white space-y-6 px-2 sm:px-16 md:px-2 lg:px-16">


        <h1 className="text-3xl sm:text-4xl font-semibold text-center italic">Ex Social</h1>
        <p className="text-md md:text-xl lg:text-2xl text-center text-gray-400">Welcome back Log in to continue enjoying the benefits</p>


        <Form {...form}>


          <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-5 mb-3">


            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Input
                      {...field}
                      id="email"
                      type="text"
                      placeholder=" "
                      className="peer w-full bg-transparent border border-gray-600 text-white py-6 sm:py-7 px-3 rounded-md outline-none focus:border-red-600 focus:ring-0 focus:shadow-[0_0_0_1.5px_rgba(255,255,255,0.1)] transition-all duration-200"
                    />
                    {!field.value && (
                      <label
                        htmlFor="email"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-400"
                      >
                        Phone, username or email address
                      </label>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const [showPassword, setShowPassword] = useState(false);
                return (
                  <FormItem>
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder=" "
                        className="peer w-full bg-transparent border border-gray-600 text-white py-6 sm:py-7 px-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />

                      {/* Floating Label */}
                      {!field.value && (
                        <label
                          htmlFor="password"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-400"
                        >
                          Password
                        </label>
                      )}

                      {/* Toggle Icon */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={18} strokeWidth={1.8} />
                        ) : (
                          <Eye size={18} strokeWidth={1.8} />
                        )}
                      </button>

                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button disabled={isPending || !form.formState.isValid} type="submit" className="text-sm sm:text-md w-full bg-primary hover:bg-primary/90 text-white rounded-full hover:cursor-pointer sm:py-6 py-5 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
              Log In {isPending && <Loader className="animate-spin duration-1000 mt-1 w-16 h-16" />}
            </Button>

          </form>

        </Form>


        <p className="text-center text-xs text-gray-400">
          By Logging In, you agree to our{" "}
          <Link
            to={'/'}
            className="text-blue-400 hover:text-blue-500 transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to={'/'}
            className="text-blue-400 hover:text-blue-500 transition-colors"
          >
            Privacy Policy
          </Link>
          , including{" "}
          <Link
            to={'/'}
            className="text-blue-400 hover:text-blue-500 transition-colors"
          >
            Cookie Use
          </Link>
        </p>



        <div className="flex items-center justify-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm sm:text-md font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>


        <div className="text-center text-sm sm:text-md font-semibold">
          <Link to={'/forgot-password'} className="text-primary hover:underline ">
            Forgotten your password?
          </Link>
        </div>


        <Button type="submit" onClick={() => { setIsLogin(false) }} className="text-sm sm:text-md w-full bg-primary hover:bg-primary/90 text-white rounded-full hover:cursor-pointer py-5 sm:py-6 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
          Create New Account
        </Button>

      </div>

    </motion.div>

  );

}
