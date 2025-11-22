import { useCallback, useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RegisterOtp from "./RegisterOtp";
import { useRegister } from "@/Services/auth/useAuth";
import { CircleCheck, CircleX, Eye, EyeOff, Loader } from "lucide-react";
import { toast } from "sonner";
import { debounce } from "@/lib/debounce";
import { useCheckIndentifier, usecheckUsername } from "@/Services/auth/useAuth";
import { Link } from "react-router-dom";




// Props type
interface LoginProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}



// Zod schema
const registerSchema = z.object({
  username: z.string().min(2, "Username is too short").max(20, "Username is too long"),
  fullname: z.string().min(2, "Full name is too short").max(35, "Full name is too long"),
  identifier: z.string().min(5, "Enter a valid email or phone number with country code")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex?.test(value)) return true;

        const phone = parsePhoneNumberFromString(value);

        if (!phone || !phone.isValid()) return false;

        return true;
      },
      {
        message:
          "Enter a valid email or phone number with a real country code (e.g., +91XXXXXXXXXX)",
      }
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
})




export default function Register({ setIsLogin }: LoginProps) {



  // Register OTP modal state
  const [isOpen, setIsOpen] = useState<boolean>(false);



  // register mutation
  const { mutate: RegisterUser, isPending } = useRegister();



  // Debounced state
  const [debouncedUsername, setDebouncedUsername] = useState("");
  const [debouncedIdentifier, setDebouncedIdentifier] = useState("");



  // Debounce handlers
  const debounceUsername = useCallback(debounce((val: string) => setDebouncedUsername(val), 500), []);
  const debounceIdentifier = useCallback(debounce((val: string) => setDebouncedIdentifier(val), 500), []);



  // Use React Query hooks
  const { data: usernameData, isFetching: usernameLoading, isError: usernameError } = usecheckUsername(debouncedUsername);
  const { data: IndentifierData, isFetching: IdentifierLoading, isError: IdentifierError } = useCheckIndentifier(debouncedIdentifier);



  // form
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: { username: "", fullname: "", identifier: "", password: "" },
  });



  // Handle request for Register OTP
  const onSubmit = (data: z.infer<typeof registerSchema>) => {


    const formdata = new FormData();

    formdata.append("identifier", data.identifier);
    formdata.append("fullname", data.fullname);
    formdata.append("username", data.username);
    formdata.append("password", data.password);


    RegisterUser(formdata, {

      onSuccess: () => {
        toast.success("Registration Successful!", {
          description: `An OTP has been sent to ${data.identifier}.`,
          duration: 7000,
        });

        setIsOpen(true);
      },

    });


  }



  return (


    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center px-2 bg-black/20 w-full"
    >


      <div className="w-full max-w-7xl bg-transparent text-white space-y-6 px-0 sm:px-16 md:px-2 lg:px-16">


        <h1 className="text-3xl sm:text-4xl font-semibold text-center italic">Ex Social</h1>

        <p className="text-md md:text-xl text-center text-gray-400">Create your account to Connect, share, and grow together</p>


        <Form {...form}>

          <form className="space-y-5 mb-2" onSubmit={form.handleSubmit(onSubmit)}>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Input
                      {...field}
                      id="username"
                      type="text"
                      autoComplete="off"
                      placeholder=" "
                      className={`peer w-full bg-transparent border ${field.value
                        ? usernameData?.is_available
                          ? "border-green-500 focus:ring-0 focus:border-green-600 focus:shadow-[0_0_8px_2px_#00ff00]"
                          : "border-red-500 focus:ring-0 focus:border-red-600 focus:shadow-[0_0_8px_2px_#ff0000]"
                        : "border-gray-600"
                        } text-white sm:py-7 py-6 px-3 rounded-md outline-none focus:ring-0 transition-all duration-200`}
                      onChange={(e) => {
                        field.onChange(e);
                        debounceUsername(e.target.value);
                      }}
                    />

                    {!field.value && (
                      <label
                        htmlFor="username"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-400"
                      >
                        Username
                      </label>
                    )}

                    {/* Right side indicator */}
                    {field.value && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {usernameLoading ? (
                          <Loader className="animate-spin w-5 h-5 text-gray-400" />
                        ) : usernameData?.is_available ? (
                          <span className="text-green-500 font-bold"><CircleCheck /></span>
                        ) : (
                          <span className="text-red-500 font-bold"><CircleX /></span>
                        )}
                      </div>
                    )}

                  </div>


                  {/* Conditional error messages */}
                  {form.formState.errors.username ? (

                    <FormMessage>{form.formState.errors.username.message}</FormMessage>

                  ) : field.value && usernameData && !usernameData?.is_available ? (

                    <FormMessage>This username is not available Try another one</FormMessage>

                  ) : usernameError ? (

                    <FormMessage>Something went wrong while checking availability. Please try again.</FormMessage>

                  ) : null}


                </FormItem>

              )}

            />


            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Input
                      {...field}
                      id="emailOrPhone"
                      type="text"
                      placeholder=" "
                      autoComplete="email"
                      className={`peer w-full bg-transparent border ${field.value
                        ? IndentifierData?.is_available
                          ? "border-green-500"
                          : "border-red-500"
                        : "border-gray-600"
                        } text-white sm:py-7 py-6 px-3 rounded-md outline-none focus:ring-0 transition-all duration-200`}
                      onChange={(e) => {
                        field.onChange(e);
                        debounceIdentifier(e.target.value);
                      }}
                    />

                    {!field.value && (
                      <label
                        htmlFor="emailOrPhone"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-400"
                      >
                        Email or Phone
                      </label>
                    )}

                    {/* Right side indicator */}
                    {field.value && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {IdentifierLoading ? (
                          <Loader className="animate-spin w-5 h-5 text-gray-400" />
                        ) : IndentifierData?.is_available ? (
                          <span className="text-green-500 font-bold"><CircleCheck /></span>
                        ) : (
                          <span className="text-red-500 font-bold"><CircleX /></span>
                        )}
                      </div>
                    )}
                  </div>


                  {/* Conditional error messages */}
                  {form.formState.errors.identifier ? (

                    <FormMessage>{form.formState.errors.identifier.message}</FormMessage>

                  ) : field.value && IndentifierData && !IndentifierData?.is_available ? (

                    <FormMessage>{form.getValues("identifier").includes("@") ? "Email" : "phone number"} already exists Please use a different one</FormMessage>

                  ) : IdentifierError ? (

                    <FormMessage>Something went wrong while checking availability. Please try again.</FormMessage>

                  ) : null}


                </FormItem>
              )}
            />



            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Input
                      {...field}
                      id="fullname"
                      type="text"
                      placeholder=" "
                      className="peer w-full bg-transparent border border-gray-600 text-white py-6 sm:py-7 px-3 rounded-md outline-none focus:border-red-600 focus:ring-0 focus:shadow-[0_0_0_1.5px_rgba(255,255,255,0.1)] transition-all duration-200"
                    />
                    {!field.value && (
                      <label
                        htmlFor="fullname"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-400"
                      >
                        Full Name
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
                        className="peer w-full bg-transparent border border-gray-600 text-white sm:py-7 py-6 px-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />

                      {!field.value && (
                        <label
                          htmlFor="password"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-400"
                        >
                          Password
                        </label>
                      )}

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />


            <Button disabled={isPending || !form.formState.isValid || !usernameData?.is_available || !IndentifierData?.is_available || usernameError || IdentifierError} type="submit" className="sm:text-md text-sm w-full bg-primary hover:bg-primary/80 text-white rounded-full hover:cursor-pointer py-5 sm:py-6 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
              Create Account {isPending && <Loader className="animate-spin duration-1000 mt-1 w-16 h-16" />}
            </Button>

          </form>

        </Form>


        <p className="text-center text-xs text-gray-400 mb-3">
          By Signing up, you agree to our{" "}
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




        <Button type="submit" onClick={() => { setIsLogin(true) }} className="text-sm sm:text-md w-full bg-primary hover:bg-primary/90 text-white rounded-full hover:cursor-pointer py-5 sm:py-6 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
          I alredy have an account
        </Button>


      </div>


      {/* Forgot Pass Otp */}
      <RegisterOtp isOpen={isOpen} setIsOpen={setIsOpen} RegisterData={form.getValues()} reset={form.reset} />


    </motion.div>


  );


}
