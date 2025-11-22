import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useForgotPasswordChange } from "@/Services/auth/useAuth";
import { toast } from "sonner";






// Props
interface ChangePassFormProps {
    Identifier: string;
}



// Form schema
const FormSchema = z.object({

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});




export default function ChangePassForm({ Identifier }: ChangePassFormProps) {


    // location change handler 
    const Navigate = useNavigate();



    // forgot password change mutation
    const { mutate: ForgotPasswordChange, isPending } = useForgotPasswordChange();




    // form
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues: { password: "", confirmPassword: "" },
    });




    // submit
    const OnSubmit = (values: z.infer<typeof FormSchema>) => {

        const formData = new FormData();

        formData.append("identifier", Identifier);  
        formData.append("new_password", values.password);


        ForgotPasswordChange(formData, {

            onSuccess: () => {

                toast.success("Password Changed" , { description: `Your password has been changed successfully.`, duration: 7000 });
                Navigate("/auth", { replace: true });

            },

        });


    }




    return (


        <div className="w-full max-w-md bg-transparent text-white space-y-6 sm:border border-gray-700 sm:p-8 py-14 rounded-lg shadow-lg">


            <h1 className="text-4xl sm:text-4xl font-semibold text-center italic">Ex Social</h1>
            <p className="text-sm sm:text-md text-center text-gray-400">Enter your new password to change your password</p>


            <Form {...form}>


                <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-5 mb-3">


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
                                            className="peer w-full bg-transparent border border-gray-600 text-white sm:py-6 py-6 px-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />

                                        {!field.value && (
                                            <label
                                                htmlFor="password"
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-400"
                                            >
                                              New Password
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



                    <FormField
                        control={form.control}
                        name="confirmPassword"
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
                                            className="peer w-full bg-transparent border border-gray-600 text-white sm:py-6 py-6 px-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />

                                        {!field.value && (
                                            <label
                                                htmlFor="password"
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-400"
                                            >
                                              Confirm  Password
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


                    <Button disabled={isPending || !form.formState.isValid} type="submit" className="text-sm sm:text-md w-full bg-primary hover:bg-primary/90 text-white rounded-full hover:cursor-pointer sm:py-5 py-5 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                        Submit {isPending && <Loader className="animate-spin duration-1000 mt-1 w-16 h-16" />}
                    </Button>

                </form>

            </Form>


            <p className="text-center text-xs text-gray-400">
                We’ll send you a verification code to securely reset your password.
            </p>


        </div>


    )



}
