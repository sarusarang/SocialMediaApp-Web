import { useMutation, useQuery } from "@tanstack/react-query";
import { RegisterApi, LoginApi, VerifyRegisterOTPApi, ResendRegisterOTPApi, LogoutApi, CheckAuthStatusApi, CheckIndentifierApi, CheckUsernameApi, ForgotPasswordApi, ForgotPasswordVerifyOtpApi, ForgotPasswordChangeApi, ForgotPasswordOtpResendApi } from "./authApi";
import type { AxiosErrorType } from "@/types/AxiosType";
import { toast } from "sonner";




// useRegister hook
export const useRegister = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await RegisterApi(data);

        },

        onError: (error: AxiosErrorType) => {

            toast.error("Oops..!", { description: error?.message, duration: 5000 })
            console.log("Register Error", error);

        }

    })

}




// use verify register OTP hook
export const useVerifyRegisterOTP = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await VerifyRegisterOTPApi(data);

        },

        onError: (error: AxiosErrorType) => {

            toast.error("Oops..!", { description: error?.message, duration: 5000 });
            console.log("Verify Register OTP Error", error);

        }

    })

}




// use verify register OTP Resend hook
export const useVerifyRegisterOTPResend = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await ResendRegisterOTPApi(data);

        },

        onError: (error: AxiosErrorType) => {

            toast.error("Oops..!", { description: error?.message, duration: 5000 })
            console.log("Verify Register OTP Resend Error", error);

        }

    })

}




// use login hook
export const useLogin = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await LoginApi(data);

        },

        onError: (error: AxiosErrorType) => {

            toast.error("Oops..!", { description: error?.message, duration: 5000 })
            console.log("Login Error", error);

        }

    })

}




// use logout hook
export const useLogout = () => {

    return useMutation({

        mutationFn: async () => {

            return await LogoutApi();

        },

        onError: (error: AxiosErrorType) => {

            toast.error("Oops..!", { description: error?.message, duration: 5000 })
            console.log("Logout Error", error);

        }

    })

}




// use Forgot Password hook
export const useForgotPassword = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await ForgotPasswordApi(data);

        },

        onError: (error: AxiosErrorType) => {

            toast.error("Oops..!", { description: error?.message, duration: 5000 })
            console.log("Forgot Password Error", error);

        }

    })

}




// use Forgot Password Verify OTP hook
export const useForgotPasswordVerifyOtp = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await ForgotPasswordVerifyOtpApi(data);

        },

        onError: (error: AxiosErrorType) => {

            toast.error("Oops..!", { description: error?.message, duration: 5000 })
            console.log("Verify Forgot Password Otp Error", error);

        }

    })

}





// use Forgot Password Verify OTP Resend hook
export const useForgotPasswordOtpResend = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await ForgotPasswordOtpResendApi(data);

        },

        onError: (error: AxiosErrorType) => {

            toast.error("Oops..!", { description: error?.message, duration: 5000 })
            console.log("Verify Forgot Password Otp Resend Error", error);

        }

    })

}





// use Forgot Password Change Resend hook
export const useForgotPasswordChange = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await ForgotPasswordChangeApi(data);

        },

        onError: (error: AxiosErrorType) => {

            toast.error("Oops..!", { description: error?.message, duration: 5000 })
            console.log("Verify Forgot Password Change Error", error);

        }

    })

}





// use check auth hook
export const useCheckAuth = () => {

    return useQuery<{ is_logged_in: boolean, message: string }>({


        queryKey: ["check-auth"],
        queryFn: async () => {

            return await CheckAuthStatusApi() as { is_logged_in: boolean, message: string };

        },
        retry: false,
        refetchOnWindowFocus: false,

    })

}




// use check username hook
export const usecheckUsername = (username: string) => {

    return useQuery<{ message: string, is_available: boolean }>({


        queryKey: ["check-username", username],
        queryFn: async () => {

            return await CheckUsernameApi(username) as { message: string, is_available: boolean };

        },
        enabled: !!username,
        refetchOnWindowFocus: false,
        retry: 1,

    })

}



// use check indentifier hook
export const useCheckIndentifier = (indentifier: string) => {

    return useQuery<{ message: string, is_available: boolean }>({


        queryKey: ["check-identifier", indentifier],
        queryFn: async () => {

            return await CheckIndentifierApi(indentifier) as { message: string, is_available: boolean };

        },
        enabled: !!indentifier,
        refetchOnWindowFocus: false,
        retry: 1,

    })

}