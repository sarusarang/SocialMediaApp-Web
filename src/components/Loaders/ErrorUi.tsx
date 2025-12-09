import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"



interface Props {
    message?: string
    retry?: () => void
}



export default function ErrorUi({ message, retry }: Props) {


    return (


        <section aria-label="error-ui" className="w-full h-[75vh] sm:h-[80vh] flex flex-col items-center justify-center text-center py-14 px-4">

            <div className="relative mb-4 flex justify-center">
              
                {/* Pulse background */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0.6 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "easeOut"
                    }}
                    className="absolute -top-5 w-40 h-40 rounded-full bg-red-500/30 dark:bg-red-500/20"
                />

                {/* Icon container */}
                <div className="p-4 rounded-full">
                    <AlertTriangle className="w-16 h-16 text-red-600 dark:text-red-500" />
                </div>

            </div>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-md sm:text-xl font-semibold text-foreground"
            >
                Oops! Something went wrong
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground mt-2 max-w-sm text-xs sm:text-sm"
            >
                {message || "We couldn't complete your request right now. Please try again."}
            </motion.p>

            {retry && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6"
                >
                    <Button
                        variant="default"
                        className="bg-gradient-to-r text-xs sm:text-sm from-primary to-red-500 hover:opacity-90 text-white shadow-md hover:cursor-pointer"
                        onClick={retry}
                    >
                        Try Again
                    </Button>
                </motion.div>
            )}

        </section>
    );
}
