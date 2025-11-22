import { useLocation, Link } from "react-router-dom";
import { Home, Users, Bell, User , Plus  } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import NotificationBadge from "../Common/NotificationBadge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useLanguage } from "@/Context/LanguageContext";





export const MobileNav = () => {


  // Language
  const { t } = useLanguage();


  // get current route
  const location = useLocation();


  // Navigation items
  const navItems = [
    { name: t("home"), path: "/", icon: Home },
    { name: t("explore"), path: "/people", icon: Users },
    { name: t("create"), path: "/create", icon: Plus  },
    { name: t("notifications"), path: "/notifications", icon: Bell },
    { name: t("profile"), path: "/profile", icon: User },
  ];


  return (


    <motion.nav
      className="md:hidden bg-background  fixed bottom-0 left-0 right-0 h-16 border-t border-border/30 z-10 transition-all duration-300 ease-in-out"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >

      <div className="h-full flex items-center justify-around">

        {navItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-full transition-colors relative",
              location.pathname === item.path ? "text-primary" : "text-muted-foreground"
            )}
          >

            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >

              {item.name === "Create" ? (
                <motion.div
                  className="bg-primary w-12 h-12 rounded-full flex items-center justify-center -mt-6 shadow-md"
                  whileHover={{
                    boxShadow: "0 0 12px rgba(59, 130, 246, 0.5)",
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </motion.div>
              ) :

                item.name === "Profile" ? (
                  <>
                    <motion.div
                      className="rounded-full flex items-center justify-center shadow-md"
                      whileHover={{
                        boxShadow: "0 0 12px rgba(59, 130, 246, 0.5)",
                        scale: 1.05
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    >
                      <Avatar className="border-2 border-primary group-hover:border-primary transition-all">
                        <AvatarImage src="https://github.com/shadcn.png" alt="logo" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {"JD"}
                        </AvatarFallback>
                      </Avatar>

                    </motion.div>
                  </>
                ) :
                  (
                    <>
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          scale: location.pathname === item.path ? [1, 1.2, 1] : 1
                        }}
                        transition={{
                          scale: { duration: 0.3 }
                        }}
                      >
                        <item.icon className={cn(
                          "h-6 w-6",
                          location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                        )} />
                      </motion.div>
                      {item.name === "Notifications" && (
                        <NotificationBadge count={2} />
                      )}
                    </>
                  )}

            </motion.div>

          </Link>

        ))}

      </div>

      {/* Active indicator */}
      <div className="absolute bottom-0 left-0 w-full px-0">
        <div className="relative w-full h-1">
          <motion.div
            className="absolute bottom-0 h-1 w-12 bg-primary rounded-t-md"
            animate={{
              left:
                location.pathname === "/feed" ? "calc(10% - 24px)" :
                  location.pathname === "/people" ? "calc(30% - 24px)" :
                    location.pathname === "/create" ? "calc(50% - 24px)" :
                      location.pathname === "/notifications" ? "calc(70% - 24px)" :
                        location.pathname === "/profile" ? "calc(90% - 24px)" : "calc(10% - 24px)"
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          />
        </div>
      </div>


    </motion.nav>
  );
};

export default MobileNav;
