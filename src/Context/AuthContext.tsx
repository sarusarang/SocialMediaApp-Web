import { createContext, useContext, useEffect } from "react";
import { useLogout } from "@/Services/auth/useAuth";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";



// Auth context type
interface AuthContextType {
    isLogoutPending: boolean;
    loginHandler: (login: boolean) => void;
    logoutHandler: () => void;
}




// Create Auth context
const AuthContext = createContext<AuthContextType | null>(null);




export const AuthProvider = ({ children }: { children: React.ReactNode }) => {



    // Navigation
    const navigate = useNavigate();
    const location = useLocation();



    //  logout function
    const { mutate: logout, isPending: isLogoutPending } = useLogout();



    // Cross-tab logout
    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "logout") {
                navigate("/auth", { replace: true });
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [navigate]);




    // Login handler
    const loginHandler = (login: boolean) => {

        if (login) toast.success("Login Successful!", { description: "You have successfully logged in.", duration: 5000 }); else toast.success("Registration Successful!", { description: "You have successfully registered.", duration: 5000 });

        const from = location.state?.from?.pathname || "/";

        if (!login) navigate("/"); else navigate(from, { replace: true });

    }



    // Logout handler
    const logoutHandler = () => {

        logout(undefined, {

            onSuccess: () => {

                toast.success("Logged Out", { description: "You have been logged out successfully.", duration: 5000 });
                localStorage.setItem("logout", Date.now().toString());
                navigate("/auth", { replace: true });
            },
            
        });

    };





    return (
        <AuthContext.Provider value={{ isLogoutPending, loginHandler, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );

};



export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within AuthProvider");
    return context;
};
