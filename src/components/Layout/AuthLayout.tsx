import { Outlet } from "react-router-dom"




export default function AuthLayout() {


    return (


        <div className="flex flex-col min-h-screen bg-black text-gray-400">


            <main className="flex-1 flex items-center justify-center">

                <Outlet />

            </main>


            {/* Footer Links */}
            <footer className="w-full text-center py-4 text-xs hidden sm:block">

                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4">
                    <a href="#" className="hover:text-white transition-colors duration-200">About</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Help</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Terms & Conditions</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Advertising</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Developers</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Community Guidelines</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Report</a>

                </div>

                <p className="mt-2 text-xs text-gray-500">© {new Date().getFullYear()} Ex Social from Exmedia</p>

            </footer>


        </div>


    )


}
