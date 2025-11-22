import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface SettingsItemProps {
    icon: ReactNode;
    title: string;
    subtitle?: string;
    onClick: () => void;
    action?: ReactNode;
}

export const SettingsItem = ({
    icon,
    title,
    subtitle,
    onClick,
    action
}: SettingsItemProps) => {
    return (

        <motion.div
            className="p-4 flex items-center justify-between cursor-pointer bg-background hover:bg-secondary/20"
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                opacity: { duration: 0.3 },
                y: { duration: 0.2 }
            }}
        >
            <div className="flex items-center gap-3">
                <motion.div
                    className="text-primary"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {icon}
                </motion.div>
                <div>
                    <div className="font-medium">{title}</div>
                    {subtitle && (
                        <motion.div
                            className="text-sm text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            {subtitle}
                        </motion.div>
                    )}
                </div>
            </div>

            <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                {action || <ChevronRight className="h-5 w-5 text-muted-foreground" />}
            </motion.div>

        </motion.div>
    );
};
