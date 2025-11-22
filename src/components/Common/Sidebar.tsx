import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Telescope, ImagePlus, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationBadge from "../Common/NotificationBadge";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Context/LanguageContext";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";



export const Sidebar = ({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) => {


  const { t } = useLanguage();
  const location = useLocation();


  // Auto-collapse for smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const navItems = [
    { name: t("home"), path: "/", icon: Home },
    { name: t("explore"), path: "/people", icon: Telescope },
    { name: t("notifications"), path: "/notifications", icon: Bell },
    { name: t("create"), path: "/create", icon: ImagePlus },
    { name: t("settings"), path: "/settings", icon: Settings },
  ];



  return (


    <>

      <motion.aside
        className={cn(
          "hidden md:flex h-full flex-col border-r border-border bg-background transition-all duration-300 ease-in-out relative shadow-sm",
          isCollapsed ? "w-[76px]" : "w-[230px]"
        )}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >

        {/* MAIN CONTENT (Scrollable) */}
        <div className="flex-grow flex flex-col py-6 overflow-y-auto scrollbar-hidden">

          <nav className="px-4 flex-1">

            {navItems.map((item) => (

              <Link key={item.path} to={item.path}>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >

                  <Button
                    variant={
                      location.pathname === item.path ? "secondary" : "ghost"
                    }
                    className={cn(
                      "w-full justify-start py-5 px-4 text-md font-medium rounded-md flex items-center gap-4 transition-all group mb-4 hover:cursor-pointer",
                      location.pathname === item.path
                        ? "bg-black/10 dark:bg-accent dark:text-white text-accent-foreground"
                        : "dark:text-white text-black hover:text-black dark:hover:text-white hover:bg-accent/70",
                      isCollapsed ? "px-4 justify-center" : ""
                    )}
                  >


                    {/* Icon */}
                    <div className="relative">

                      <item.icon
                        style={{ height: '28px', width: "22px" }}
                        className={cn(
                          "transition-all duration-200",
                          isCollapsed ? "h-52 w-52" : "h-52 w-52"
                        )}
                      />

                      {item.path === "/notifications" && (
                        <span className="absolute -top-2 -right-2">
                          <NotificationBadge count={10} />
                        </span>
                      )}

                    </div>

                    {/* Text */}
                    <AnimatePresence>
                      {(!isCollapsed) && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="truncate"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>

                  </Button>

                </motion.div>

              </Link>

            ))}

          </nav>

        </div>




        {/* FOOTER (Always Visible) */}
        <div className="border-t border-border/40 p-4 shrink-0">

          {/* User PROFILE */}
          <motion.div
            layout
            className="flex items-center justify-between mb-4"
            transition={{ type: "spring", stiffness: 350, damping: 13 }}
          >

            {/* LEFT SIDE PROFILE (container always mounted) */}
            <motion.div layout className="flex items-center">

              <AnimatePresence mode="popLayout">

                {!isCollapsed && (

                  <motion.div
                    key="expanded-profile"
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-3"
                  >

                    <Link
                      to="/profile"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition"
                    >

                      <Avatar className="border-2 border-primary/20">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">John Doe</span>
                        <span className="text-xs text-muted-foreground">@johndoe</span>
                      </div>

                    </Link>

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.div>


            {/* RIGHT SIDE ACTIONS (container always mounted) */}
            <motion.div layout className="flex flex-col gap-3 items-center">

              <AnimatePresence>

                {isCollapsed && (

                  <motion.div
                    key="collapsed-avatar"
                    layout
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.1 }}
                  >

                    <Link to="/profile" className="p-1 rounded-full hover:bg-accent">

                      <Avatar className="border-1 border-primary/20 h-10 w-10">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Link>

                  </motion.div>

                )}

              </AnimatePresence>

              <AnimatedThemeToggler className="hover:cursor-pointer" />

            </motion.div>

          </motion.div>



          {/* COPYRIGHT */}
          <AnimatePresence>
            {(!isCollapsed) && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-center text-muted-foreground"
              >
                © {new Date().getFullYear()} MySocial. All rights reserved.
              </motion.p>
            )}
          </AnimatePresence>

        </div>

      </motion.aside>

    </>

  );

};


export default Sidebar;
