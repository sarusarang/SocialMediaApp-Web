import { Link, useNavigate } from "react-router-dom";
import { Menu, Settings, } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import SearchBar from "./SearchBar";



export default function Header({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) {



    const navigate = useNavigate();


    return (

        <motion.header
            className="sticky top-0 z-30 w-full border-b border-border backdrop-blur-sm bg-background/80 px-5"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >

            <div className="container flex h-16 max-w-screen-2xl items-center">


                <div className="flex items-center justify-between w-full gap-2 md:gap-4">


                    {/* Logo & Title */}
                    <AnimatePresence>

                        <div className="flex justify-start items-center gap-2 md:gap-4">

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="dark:hover:bg-muted-foreground/50 rounded-full p-5 hover:cursor-pointer"
                            >
                                <Menu style={{width:"22px" , height:"28px"}} className="lnline-block mt-1" />
                            </Button>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link to="/feed" className="flex items-center">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mr-2 md:mr-4"
                                    >
                                        <motion.div
                                            className="flex items-center"
                                            initial={{ rotateY: 90 }}
                                            animate={{ rotateY: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >

                                            <span className="ml-2 text-xl italic font-bold sm:inline-block text-primary">Ex App</span>

                                        </motion.div>
                                    </motion.div>
                                </Link>
                            </motion.div>

                        </div>

                    </AnimatePresence>


                    {/* Desktop Search Bar */}
                    <SearchBar />


                    <div className="flex justify-center items-center">

                        <Button
                            variant="ghost"
                            size="default"
                            className={cn(
                                "md:hidden",
                                "relative"
                            )}
                            onClick={() => navigate('/settings')}
                        >
                            <Settings className="h-8 w-8" />

                        </Button>

                    </div>




                </div>

            </div>
        </motion.header>
    );
};
