import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
    count: number;
    className?: string;
}

const NotificationBadge = ({ count, className }: NotificationBadgeProps) => {
    
    if (count <= 0) return null;

    return (
        <div
            className={cn(
                "absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-500 text-white text-xs min-w-[18px] h-[18px] px-1",
                className
            )}
        >
            {count > 9 ? "9+" : count}
        </div>
    );
};

export default NotificationBadge;