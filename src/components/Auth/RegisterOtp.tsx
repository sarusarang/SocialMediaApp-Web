import { useEffect, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
import { BadgeCheck, Loader, RefreshCw, ShieldCheck } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { motion } from 'framer-motion';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useVerifyRegisterOTP, useVerifyRegisterOTPResend } from "@/Services/auth/useAuth";
import { toast } from "sonner";
import { useAuthContext } from "@/Context/AuthContext";
import { DialogOverlay } from "@radix-ui/react-dialog";





// Props
interface RegisterOtpProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    reset: () => void
    RegisterData: { identifier: string; username: string; password: string; };
}




// Form Schema
const FormSchema = z.object({

    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),

})




export default function OtpModal({ isOpen, setIsOpen, RegisterData, reset }: RegisterOtpProps) {


    // Otp time out
    const [timeLeft, setTimeLeft] = useState(300);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [otpExpired, setOtpExpired] = useState(false);


    // Add a state to trigger timer reset
    const [timerKey, setTimerKey] = useState(0);



    // Auth context
    const { loginHandler } = useAuthContext();



    // Mutation for otp verification
    const { mutate: VerifyRegisterOTP, isPending: isVerifyPending } = useVerifyRegisterOTP()



    // Mutation for otp resend
    const { mutate: ResendRegisterOTP, isPending: isResendPending } = useVerifyRegisterOTPResend()



    // Timer function
    useEffect(() => {

        if (!isOpen) return;

        setTimeLeft(300);
        setIsResendDisabled(true);
        setOtpExpired(false);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setOtpExpired(true);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);

    }, [isOpen, timerKey]);




    // Function to format time (MM:SS)
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };



    // Form
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {

            pin: "",

        },
    });




    // Handle Register User and Verify OTP
    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        const formdata = new FormData()

        formdata.append("identifier", RegisterData.identifier)
        formdata.append("username", RegisterData.username)
        formdata.append("fullname", RegisterData.username)
        formdata.append("password", RegisterData.password)
        formdata.append("otp", data.pin)

        VerifyRegisterOTP(formdata, {

            onSuccess: () => {

                // to determine if user is new or not
                loginHandler(false);
               
                setIsOpen(false);
                form.reset();
                reset();
                setTimerKey((prev) => prev + 1);
            },

        });

    }




    // Resend Otp
    const handleResendOtp = () => {

        const formdata = new FormData()

        formdata.append("identifier", RegisterData.identifier)


        ResendRegisterOTP(formdata, {

            onSuccess: () => {
                toast.success("OTP Resent!", { description: `A new OTP has been sent to your ${RegisterData.identifier}`, duration: 7000 });
                setTimerKey((prev) => prev + 1); 
                setIsResendDisabled(true);
                setOtpExpired(false);
            },

        });

    }



    return (


        <>

            <Dialog open={isOpen} onOpenChange={setIsOpen} modal >

                <DialogOverlay />

                <DialogContent onInteractOutside={(event) => event.preventDefault()} className="p-0 max-w-md h-full sm:h-auto items-center overflow-hidden rounded-3xl border-0 shadow-xl">


                    <div className="p-6">


                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-6"
                        >
                            <h2 className="text-2xl font-bold flex items-center justify-center">Verification Required <ShieldCheck size={26} className="ml-2" /></h2>
                            <p className="text-gray-500 mt-2">
                                We’ve sent a verification code to your {" "}
                                {RegisterData.identifier.includes("@") ? "Email" : "Phone Number"}
                            </p>

                        </motion.div>


                        <Form {...form}>


                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (

                                        <FormItem className="space-y-4">

                                            <FormControl>

                                                <div className="flex justify-center">

                                                    <InputOTP maxLength={6} {...field} className="gap-4">
                                                        <InputOTPGroup className="gap-2">
                                                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                                                <motion.div
                                                                    key={index}
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                                >
                                                                    <InputOTPSlot
                                                                        index={index}
                                                                        className="w-12 h-14 text-lg rounded-xl border border-gray-400 shadow-sm"
                                                                    />
                                                                </motion.div>
                                                            ))}
                                                        </InputOTPGroup>
                                                    </InputOTP>

                                                </div>

                                            </FormControl>

                                            <FormDescription className="text-center text-gray-500">
                                                Check your {" "} {RegisterData.identifier.includes("@") ? "Email" : "Inbox"} for the verification code
                                            </FormDescription>

                                            {/* Countdown Timer */}
                                            <p className="text-center text-gray-500">
                                                {otpExpired ? (
                                                    <span className="text-red-500">OTP Expired! Please request a new one.</span>
                                                ) : (
                                                    <span className="text-white font-semibold">OTP Expires In <span className="text-red-500">{formatTime(timeLeft)}</span> </span>
                                                )}
                                            </p>

                                            <FormMessage className="text-center" />

                                        </FormItem>
                                    )}
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.4 }}
                                    className="flex flex-col space-y-3"
                                >
                                    <Button
                                        type="submit"
                                        disabled={otpExpired || isVerifyPending}
                                        className={`${otpExpired ? "bg-primary/35 hover:cursor-not-allowed py-6" : "bg-primary font-semibold w-full py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center hover:cursor-pointer"} `}
                                    >
                                        Verify {isVerifyPending ? <Loader className="animate-spin duration-1000 mt-1 w-16 h-16" /> : <BadgeCheck size={28} className="mt-1" />}

                                    </Button>

                                    <Button
                                        type="button"
                                        variant="default"
                                        className="text-white bg-black font-semibold py-6 border border-gray-700 hover:bg-gray-900 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:cursor-pointer"
                                        onClick={handleResendOtp}
                                        disabled={isResendDisabled || isResendPending}
                                    >
                                        Resend OTP {isResendPending ? <Loader className="animate-spin duration-1000 mt-1 w-16 h-16" /> : <RefreshCw />}
                                    </Button>

                                </motion.div>

                            </form>

                        </Form>

                    </div>

                </DialogContent>


            </Dialog >

        </>

    )

}
