
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type SuspenseLoaderProps = {
    className?: string;
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary" | "muted";
    text?: string;
    fullScreen?: boolean;
};

export const SuspenseLoader = ({
    className,
    size = "md",
    color = "primary",
    text,
    fullScreen = false,
}: SuspenseLoaderProps) => {
    // Size mappings
    const sizeMap = {
        sm: {
            container: "gap-2",
            dots: "h-1.5 w-1.5",
        },
        md: {
            container: "gap-3",
            dots: "h-2.5 w-2.5",
        },
        lg: {
            container: "gap-4",
            dots: "h-3.5 w-3.5",
        },
    };

    // Color mappings
    const colorMap = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        muted: "bg-muted-foreground",
    };

    // Animation variants
    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const dotVariants = {
        initial: { y: 0, opacity: 0.4 },
        animate: {
            y: [0, -10, 0],
            opacity: [0.4, 1, 0.4],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
            } as const,
        },
    };

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center",
                fullScreen && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
                className
            )}
        >
            <motion.div
                className={cn("flex items-center", sizeMap[size].container)}
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className={cn(
                            "rounded-full",
                            colorMap[color],
                            sizeMap[size].dots
                        )}
                        variants={dotVariants}
                        initial="initial"
                        animate="animate"
                        custom={index}
                        transition={{
                            delay: index * 0.2,
                        }}
                    />
                ))}
            </motion.div>
            {text && (
                <motion.p
                    className="mt-4 text-muted-foreground text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
};

export default SuspenseLoader;