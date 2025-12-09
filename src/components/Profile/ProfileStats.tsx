import { cn } from "@/lib/utils";

interface ProfileStatProps {
    value?: string | number;
    label: string;
    className?: string;
}

const ProfileStat = ({ value, label, className }: ProfileStatProps) => {
    return (
        <div className={cn("flex flex-col transition-transform hover:scale-105 duration-200", className)}>
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-700">{value}</span>
            <span className="text-sm text-muted-foreground">{label}</span>
        </div>
    );
};

export default ProfileStat;