import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";



// Type for the language
type Language = "en" | "hi" | "ml";



// Type for the context
type LanguageContextType = {
    language: Language;
    setLanguage: (language: Language) => void;
    availableLanguages: { code: Language; name: string }[];
    t: (key: string) => string;
};


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);


const availableLanguages = [
    { code: "en" as Language, name: "English" },
    { code: "hi" as Language, name: "हिन्दी" },
    { code: "ml" as Language, name: "മലയാളം" }
];


// Simple translations for demo purposes
const translations: Record<Language, Record<string, string>> = {
    en: {
        "home": "Home",
        "explore": "Explore",
        "create": "Create",
        "notifications": "Notifications",
        "profile": "Profile",
        "settings": "Settings",
        "language": "Language",
        "darkMode": "Dark mode",
        "notifications_setting": "Notifications",
        "privacy": "Privacy settings",
        "twoFactor": "Two-factor authentication",
        "autoplayVideos": "Autoplay videos",
        "dataUsage": "Data usage",
        "helpCenter": "Help center",
        "about": "About",
        "logout": "Logout",
        "account": "Account",
        "privacySecurity": "Privacy & Security",
        "appPreferences": "App Preferences",
        "support": "Support",
        "manageSetting": "Manage your account settings and preferences",
        "whoCanSee": "Manage who can see your content",
        "extraLayer": "Add an extra layer of security",
        "reduceData": "Reduce data consumption",
        "getHelp": "Get help with using the app",
        "version": "Version 1.0.0",
        "posting": "Posting...",
        "whatsOnMind": "What's on your mind?",
        "photo": "Photo",
        "share": "Share",
        "loadingImage": "Loading image..."
    },
    hi: {
        "home": "होम",
        "explore": "खोजें",
        "create": "नया पोस्ट",
        "notifications": "सूचनाएँ",
        "profile": "प्रोफ़ाइल",
        "settings": "सेटिंग्स",
        "language": "भाषा",
        "darkMode": "डार्क मोड",
        "notifications_setting": "सूचनाएँ",
        "privacy": "गोपनीयता सेटिंग्स",
        "twoFactor": "दो-कारक प्रमाणीकरण",
        "autoplayVideos": "वीडियो स्वतः चलाएं",
        "dataUsage": "डेटा उपयोग",
        "helpCenter": "सहायता केंद्र",
        "about": "परिचय",
        "logout": "लॉग आउट",
        "account": "खाता",
        "privacySecurity": "गोपनीयता और सुरक्षा",
        "appPreferences": "ऐप प्राथमिकताएँ",
        "support": "सहायता",
        "manageSetting": "अपने खाते की सेटिंग्स और प्राथमिकताएँ प्रबंधित करें",
        "whoCanSee": "प्रबंधित करें कि आपकी सामग्री कौन देख सकता है",
        "extraLayer": "अतिरिक्त सुरक्षा परत जोड़ें",
        "reduceData": "डेटा खपत कम करें",
        "getHelp": "ऐप का उपयोग करने में मदद प्राप्त करें",
        "version": "संस्करण 1.0.0",
        "posting": "पोस्ट कर रहा है...",
        "whatsOnMind": "आप क्या सोच रहे हैं?",
        "photo": "फोटो",
        "share": "शेयर",
        "loadingImage": "छवि लोड हो रही है..."
    },
    ml: {
        "home": "ഹോം",
        "explore": "എക്സ്പ്ലോർ",
        "create": "പുതിയ പോസ്റ്റ്",
        "new": "പുതിയത്",
        "post": "പോസ്റ്റ്",
        "notifications": "അറിയിപ്പുകൾ",
        "profile": "പ്രൊഫൈൽ",
        "settings": "ക്രമീകരണങ്ങൾ",
        "language": "ഭാഷ",
        "darkMode": "ഡാർക്ക് മോഡ്",
        "notifications_setting": "അറിയിപ്പുകൾ",
        "privacy": "സ്വകാര്യതാ ക്രമീകരണങ്ങൾ",
        "twoFactor": "ടു-ഫാക്ടർ ഓതന്റിക്കേഷൻ",
        "autoplayVideos": "വീഡിയോകൾ സ്വയമേവ പ്ലേ ചെയ്യുക",
        "dataUsage": "ഡാറ്റ ഉപയോഗം",
        "helpCenter": "സഹായ കേന്ദ്രം",
        "about": "കുറിച്ച്",
        "logout": "ലോഗ്ഔട്ട്",
        "account": "അക്കൗണ്ട്",
        "privacySecurity": "സ്വകാര്യത & സുരക്ഷ",
        "appPreferences": "ആപ്പ് മുൻഗണനകൾ",
        "support": "പിന്തുണ",
        "manageSetting": "നിങ്ങളുടെ അക്കൗണ്ട് ക്രമീകരണങ്ങളും മുൻഗണനകളും നിയന്ത്രിക്കുക",
        "whoCanSee": "നിങ്ങളുടെ ഉള്ളടക്കം ആർക്കൊക്കെ കാണാം എന്നത് നിയന്ത്രിക്കുക",
        "extraLayer": "കൂടുതൽ സുരക്ഷാ ലെയർ ചേർക്കുക",
        "reduceData": "ഡാറ്റ ഉപഭോഗം കുറയ്ക്കുക",
        "getHelp": "ആപ്പ് ഉപയോഗിക്കുന്നതിൽ സഹായം നേടുക",
        "version": "പതിപ്പ് 1.0.0",
        "posting": "പോസ്റ്റ് ചെയ്യുന്നു...",
        "whatsOnMind": "നിങ്ങളുടെ മനസിലുള്ളത് എന്താണ്?",
        "photo": "ഫോട്ടോ",
        "share": "ഷെയർ",
        "loadingImage": "ചിത്രം ലോഡുചെയ്യുന്നു..."
    }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {


    const [language, setLanguageState] = useState<Language>(() => {
        // Check for saved language
        const savedLanguage = localStorage.getItem("language") as Language | null;
        const browserLanguage = navigator.language.split('-')[0] as Language;
        // Default to English if browser language not supported
        const isSupported = availableLanguages.some(lang => lang.code === browserLanguage);
        return savedLanguage || (isSupported ? browserLanguage : "en");
    });


    // Set language
    const setLanguage = (newLanguage: Language) => {

        setLanguageState(newLanguage);

        toast("Language changed", { description: `Language has been changed to ${availableLanguages.find(l => l.code === newLanguage)?.name}` });

    };


    // Translation function
    const t = (key: string): string => {
        return translations[language]?.[key] || translations.en[key] || key;
    };



    useEffect(() => {
        // Update localStorage when language changes
        localStorage.setItem("language", language);
        // Here you would also update the app's translations
        document.documentElement.lang = language;
    }, [language]);


    return (
        <LanguageContext.Provider value={{ language, setLanguage, availableLanguages, t }}>
            {children}
        </LanguageContext.Provider>
    );


};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};