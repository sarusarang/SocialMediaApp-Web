import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "sonner";



// Token refresh handling
let isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];



// Notify all subscribers once token is refreshed
const onRefreshed = (token?: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};



// Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});




// 🧩 Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);



// 🧩 Response Interceptor
axiosInstance.interceptors.response.use(

    (response) => response,

    async (error: AxiosError) => {

        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            // Prevent multiple parallel refresh calls
            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshSubscribers.push(() => {
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {

                // 🔄 Try refresh token
                await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/web/token/refresh/`,
                    {},
                    { withCredentials: true }
                );

                onRefreshed();
                isRefreshing = false;

                // Retry original request
                return axiosInstance(originalRequest);

            } catch (refreshError) {

                isRefreshing = false;
                onRefreshed();

                toast.error("Session expired", {
                    description: "Please log in again.",
                    duration: 5000,
                });

                // Trigger logout sync across tabs
                localStorage.setItem("logout", Date.now().toString());
                

                return Promise.reject(refreshError);

            }

        }


        // Handle other errors
        const status = error.response?.status;
        const data = error.response?.data;
        const message = (data as any)?.message || "Something went wrong, please try again.";

        return Promise.reject({ status, message, data });
        
    }
    
);

export default axiosInstance;
