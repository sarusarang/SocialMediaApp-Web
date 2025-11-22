import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLanguage } from "./../Context/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "../components/Settings/LanguageSelector";
import { SettingsSection } from "../components/Settings/SettingsSelections";
import { SettingsItem } from "../components/Settings/SettingsItem";
import { Bell, Lock, HelpCircle, Info, Smartphone, UserCog, LogOut, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuthContext } from "@/Context/AuthContext";







const Settings = () => {



    // Access the auth context for logout
    const { logoutHandler, isLogoutPending } = useAuthContext();



    // Access the language context
    const { t } = useLanguage();



    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [autoPlayVideos, setAutoPlayVideos] = useState(true);
    const [dataUsageReduced, setDataUsageReduced] = useState(false);



    const toggleNotifications = () => {

        setNotificationsEnabled(!notificationsEnabled);

        toast(!notificationsEnabled ? "Notifications enabled" : "Notifications disabled", { description: !notificationsEnabled ? "You will now receive notifications" : "You will no longer receive notifications" });

    };



    return (


        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-2 md:pb-6"
        >


            <Card className="shadow-sm mb-6">
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <UserCog className="h-5 w-5" />
                        {t("settings")}
                    </CardTitle>
                    <CardDescription>
                        {t("manageSetting")}
                    </CardDescription>
                </CardHeader>
            </Card>



            <div className="grid gap-6">


                {/* ACCOUNT */}
                <SettingsSection title={t("account")} icon={<UserCog className="h-5 w-5" />}>

                    <SettingsItem
                        icon={<Bell className="h-5 w-5" />}
                        title={t("notifications_setting")}
                        onClick={() => { }}
                        action={
                            <Switch
                                className="hover:cursor-pointer"
                                checked={notificationsEnabled}
                                onCheckedChange={toggleNotifications}
                            />
                        }
                    />

                    <LanguageSelector />


                </SettingsSection>



                {/* PRIVACY & SECURITY */}
                <SettingsSection title={t("privacySecurity")} icon={<Lock className="h-5 w-5" />}>

                    <SettingsItem
                        icon={<Lock className="h-5 w-5" />}
                        title={t("privacy")}
                        subtitle={t("whoCanSee")}
                        onClick={() => {

                            toast(t("privacy"), { description: "This feature is coming soon!" });

                        }}
                    />

                    <SettingsItem
                        icon={<Lock className="h-5 w-5" />}
                        title={t("twoFactor")}
                        subtitle={t("extraLayer")}
                        onClick={() => {

                            toast(t("twoFactor"), { description: "This feature is coming soon!" });

                        }}
                    />

                </SettingsSection>



                {/* APP PREFERENCES */}
                <SettingsSection title={t("appPreferences")} icon={<Smartphone className="h-5 w-5" />}>

                    <SettingsItem
                        icon={<Smartphone className="h-5 w-5" />}
                        title={t("autoplayVideos")}
                        onClick={() => { toast(t("autoplayVideos"), { description: !autoPlayVideos ? "You will now autoplay videos" : "You will no longer autoplay videos" }) }}
                        action={
                            <Switch
                                className="hover:cursor-pointer"
                                checked={autoPlayVideos}
                                onCheckedChange={() => setAutoPlayVideos(!autoPlayVideos)}
                            />
                        }
                    />

                    <SettingsItem
                        icon={<Smartphone className="h-5 w-5" />}
                        title={t("dataUsage")}
                        subtitle={t("reduceData")}
                        onClick={() => { toast(t("dataUsage"), { description: !dataUsageReduced ? "You will now reduce your data usage" : "You will no longer reduce your data usage" }) }}
                        action={
                            <Switch
                                className="hover:cursor-pointer"
                                checked={dataUsageReduced}
                                onCheckedChange={() => setDataUsageReduced(!dataUsageReduced)}
                            />
                        }
                    />

                </SettingsSection>



                {/* SUPPORT */}
                <SettingsSection title={t("support")} icon={<HelpCircle className="h-5 w-5" />}>
                    <SettingsItem
                        icon={<HelpCircle className="h-5 w-5" />}
                        title={t("helpCenter")}
                        subtitle={t("getHelp")}
                        onClick={() => {

                            toast(t("helpCenter"), { description: "This feature is coming soon!" });

                        }}
                    />

                    <SettingsItem
                        icon={<Info className="h-5 w-5" />}
                        title={t("about")}
                        subtitle={t("version")}
                        onClick={() => { toast(t("App Version"), { description: (t("version")) }) }}
                    />
                </SettingsSection>


                {/* LOGOUT */}
                <Button
                    className="mt-0 sm:w-52 hover:cursor-pointer bg-red-600 hover:bg-red-700"
                    disabled={isLogoutPending}
                    onClick={logoutHandler}
                >
                    {isLogoutPending ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <LogOut className="h-5 w-5 mr-2" />}
                    {t("logout")}
                </Button>


            </div>


        </motion.div>


    );

};


export default Settings;