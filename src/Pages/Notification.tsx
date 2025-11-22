import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bell, Heart, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


// Notifcation Types
type Notification = {
    id: string;
    type: "like" | "follow" | "comment";
    from: {
        id: string;
        username: string;
        avatar: string;
    };
    postId?: string;
    read: boolean;
    createdAt: string;
};


// Mock notifications
const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "notif-1",
        type: "like",
        from: {
            id: "user-2",
            username: "jane",
            avatar: "/placeholder.svg",
        },
        postId: "post-1",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
        id: "notif-2",
        type: "follow",
        from: {
            id: "user-3",
            username: "mike",
            avatar: "/placeholder.svg",
        },
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    },
    {
        id: "notif-3",
        type: "follow",
        from: {
            id: "user-4",
            username: "sarah",
            avatar: "/placeholder.svg",
        },
        postId: "post-2",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
];



const Notifications = () => {


    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "like":
                return <Heart size={18} className="text-red-500" />;
            case "follow":
                return <UserPlus size={18} className="text-green-500" />;
            default:
                return null;
        }
    };


    const getNotificationText = (notification: any) => {
        switch (notification.type) {
            case "like":
                return "liked your post";
            case "follow":
                return "started following you";

        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (


        <div className="w-full mx-auto px-4 py-5 sm:py-0 sm:px-0">

            <h1 className="text-2xl font-bold mb-6 flex items-center">Notifications <Bell className="mt-1 ms-2" size={24} /> </h1>

            {MOCK_NOTIFICATIONS.length > 0 ? (

                <motion.div
                    className="space-y-3"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {MOCK_NOTIFICATIONS.map((notification: Notification, index: number) => (

                        <motion.div
                            key={index}
                            variants={item}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 24
                            }}
                            className="group"
                        >
                            <Card
                                className={cn(
                                    "glass-card hover:shadow-lg overflow-hidden transition-all duration-300",
                                    !notification.read && "border-primary/40 shadow-sm"
                                )}
                            >
                                <div className="p-4 flex items-center justify-center gap-3 relative">

                                    <div className={cn(
                                        "rounded-full p-2.5 transition-colors",
                                        notification.type === "like" ? "bg-red-500/10" : "bg-green-500/10"
                                    )}>
                                        {getNotificationIcon(notification.type)}
                                    </div>

                                    <Avatar className="h-10 w-10 border shadow-sm">
                                        <AvatarImage src={notification.from.avatar} alt={notification.from.username} />
                                        <AvatarFallback>{notification.from.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <p className="font-medium">
                                            <Link to={`/userprofile/${notification.from.username}`}><span className="text-primary/90">@{notification.from.username}</span>{" "} </Link>
                                            {getNotificationText(notification)}
                                        </p>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>

                                    {!notification.read && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="h-2.5 w-2.5 bg-primary rounded-full absolute top-3 right-3"
                                        />
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

            ) : (

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12 px-4 rounded-lg bg-muted/30 shadow-sm"
                >
                    <div className="bg-muted/30 p-5 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Heart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No notifications yet</h3>
                    <p className="text-muted-foreground text-sm">
                        When someone interacts with you, you'll see it here
                    </p>
                </motion.div>

            )}
        </div>
    );
};

export default Notifications;