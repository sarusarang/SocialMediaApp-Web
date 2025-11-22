import { Activity, useState } from "react";
import { motion } from "framer-motion";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Loader } from "lucide-react";
import { useForgotPassword } from "@/Services/auth/useAuth";
import { toast } from "sonner";
import ForgotPassOtp from "./ForgotPassOtp";
import ChangePassForm from "./ChangePassForm";




// Form schema
const FormSchema = z.object({
    identifier: z.string().min(3, "Enter your email or phone number").refine(
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
});




export default function ForgotForm() {


    // Forgot OTP modal state
    const [isOpen, setIsOpen] = useState<boolean>(false);



    // Otp verified 
    const [isVerified, setIsVerified] = useState<boolean>(true);



    // Forgot password mutation
    const { mutate: Forgotpassword, isPending } = useForgotPassword();



    // form
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues: { identifier: "" },
    });



    // submit
    const OnSubmit = (values: z.infer<typeof FormSchema>) => {

        const formData = new FormData();

        formData.append("identifier", values.identifier);


        Forgotpassword(formData, {

            onSuccess: () => {

                toast.success("OTP Sent!", { description: `An OTP has been sent to ${values.identifier}.`, duration: 7000 });
                setIsOpen(true);

            },

        });


    }
    


    return (


        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center bg-black/20"
        >


            <Activity mode={isVerified ? "visible" : "hidden"} >

                <div className="w-full max-w-md bg-transparent text-white space-y-6 sm:border border-gray-700 sm:p-8 py-14 rounded-lg shadow-lg">


                    <h1 className="text-4xl sm:text-4xl font-semibold text-center italic">Ex Social</h1>
                    <p className="text-sm sm:text-md text-center text-gray-400">Forgot your password? Let’s help you get back in</p>


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
                                                className="peer w-full bg-transparent border border-gray-600 text-white py-6 sm:py-6 px-3 rounded-md outline-none focus:border-red-600 focus:ring-0 focus:shadow-[0_0_0_1.5px_rgba(255,255,255,0.1)] transition-all duration-200"
                                            />
                                            {!field.value && (
                                                <label
                                                    htmlFor="email"
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-400"
                                                >
                                                    Phone or email address
                                                </label>
                                            )}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <Button disabled={isPending || !form.formState.isValid} type="submit" className="text-sm sm:text-md w-full bg-primary hover:bg-primary/90 text-white rounded-full hover:cursor-pointer sm:py-5 py-5 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                Continue {isPending && <Loader className="animate-spin duration-1000 mt-1 w-16 h-16" />}
                            </Button>

                        </form>

                    </Form>


                    <p className="text-center text-xs text-gray-400">
                        We’ll send you a verification code to securely reset your password.
                    </p>


                </div>


            </Activity>


            <Activity mode={!isVerified ? "visible" : "hidden"} >

                <ChangePassForm Identifier={form.getValues("identifier")} />

            </Activity>


            {/* Forgot Pass OTP */}
            <ForgotPassOtp isOpen={isOpen} setIsOpen={setIsOpen} Identifier={form.getValues("identifier")} setVerified={setIsVerified} />


        </motion.div>


    )


}
