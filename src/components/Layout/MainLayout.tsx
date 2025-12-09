import { useState } from "react";
import Header from "../Common/Header";
import MobileNav from "../Common/MobNav";
import Sidebar from "../Common/Sidebar";
import { Outlet } from "react-router-dom";



export default function MainLayout() {



    // Sidebar collapse state
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);


    return (


        <div className="flex flex-col min-h-screen bg-background">


            {/* FULL WIDTH HEADER */}
            <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />


            {/* BELOW HEADER: SIDEBAR + MAIN CONTENT */}
            <div className="flex flex-1">

                {/* Sidebar */}
                <aside className="hidden md:block sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
                    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                </aside>


                {/* Main Content */}
                <main className="flex-1 pb-20 md:pb-6 transition-all duration-300 ease-in-out">
                    <div className="mx-auto w-full px-0 sm:px-4 py-0 sm:py-6">
                        <Outlet />
                    </div>
                </main>

            </div>


            {/* Mobile Bottom Navigation */}
            <MobileNav />


        </div>


    );


};
