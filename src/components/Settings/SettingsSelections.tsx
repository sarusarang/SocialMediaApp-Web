
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface SettingsSectionProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
}

export const SettingsSection = ({ title, icon, children }: SettingsSectionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
            <Card className="overflow-hidden shadow-sm border-border/50">
                <CardHeader className="pb-3 bg-background">
                    <CardTitle className="text-lg flex items-center gap-2">
                        {icon}
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 divide-y divide-border">
                    {children}
                </CardContent>
            </Card>
        </motion.div>
    );
};
