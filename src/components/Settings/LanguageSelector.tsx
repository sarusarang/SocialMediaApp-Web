import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../Context/LanguageContext";
import { SettingsItem } from "./SettingsItem";
import { motion } from "framer-motion";



export const LanguageSelector = () => {


    const { language, setLanguage, availableLanguages, t } = useLanguage();

    const [open, setOpen] = useState(false);

    const currentLanguage = availableLanguages.find(lang => lang.code === language);

    return (
        <>
            <SettingsItem
                icon={<Globe className="h-5 w-5" />}
                title={t("language")}
                subtitle={currentLanguage?.name || "English"}
                onClick={() => setOpen(true)}
            />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            {t("language")}
                        </DialogTitle>
                        <DialogDescription>
                            Select your preferred language
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-1">
                            {availableLanguages.map((lang) => (
                                <motion.div
                                    key={lang.code}
                                    whileHover={{ scale: 1.01, backgroundColor: "rgba(0,0,0,0.03)" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-between p-3 h-auto"
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setOpen(false);
                                        }}
                                    >
                                        <span>{lang.name}</span>
                                        {language === lang.code && (
                                            <Check className="h-4 w-4 text-primary" />
                                        )}
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
};