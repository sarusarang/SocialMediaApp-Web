import { CommonApi } from "@/lib/CommonApi";




//Login API
export const LoginApi = async (reqbody: any) => {

    return await CommonApi("POST", "/auth/web/login/", reqbody);

}




//Register API
export const RegisterApi = async (reqbody: any) => {

    return await CommonApi("POST", "/auth/web/register/", reqbody);

}




// Verify Register OTP API
export const VerifyRegisterOTPApi = async (reqbody: any) => {

    return await CommonApi("POST", "/auth/web/verify-otp/", reqbody);
}





//Resend Register OTP API
export const ResendRegisterOTPApi = async (reqbody: any) => {

    return await CommonApi("POST", "/auth/web/resend-otp/", reqbody);
}




//Logout API
export const LogoutApi = async () => {

    return await CommonApi("POST", "/auth/web/logout/");

}




// check authentication status API
export const CheckAuthStatusApi = async () => {

    return await CommonApi("GET", "/auth/web/check-login/");

}




// check username is available API
export const CheckUsernameApi = async (username: string) => {

    const params = new URLSearchParams({ username });

    return await CommonApi("GET", `/auth/web/check-username/?${params.toString()}`);

}




// check Indentifier is available API
export const CheckIndentifierApi = async (indentifier: string) => {

    const params = new URLSearchParams({ identifier: indentifier });

    return await CommonApi("GET", `/auth/web/check-identifier/?${params.toString()}`);

}



// forgot password API
export const ForgotPasswordApi = async (reqbody: any) => {

    return await CommonApi("POST", "/auth/web/password/reset/otp/", reqbody);

}



// forgot password verify otp API
export const ForgotPasswordVerifyOtpApi = async (reqbody: any) => {

    return await CommonApi("POST", "/auth/web/password/reset/otp/verify/", reqbody);

}



// forgot password verify otp resend API
export const ForgotPasswordOtpResendApi = async (reqbody: any) => {

    return await CommonApi("POST", "/auth/web/password/reset/otp/resent/", reqbody);

}



// forgot password change API
export const ForgotPasswordChangeApi = async (reqbody: any) => {

    return await CommonApi("PATCH", "/auth/web/password/change/", reqbody);

}