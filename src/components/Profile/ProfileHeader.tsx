import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Camera, Edit, Grid, BookmarkCheckIcon, Heart, UserCheck, UserPlus, Copy } from "lucide-react";
import ProfileStat from "./ProfileStats";
import { toast } from "sonner";

interface ProfileHeaderProps {
    isCurrentUser?: boolean;
}

interface PostImage {
    url: string;
    likes: number;
}

const ProfileHeader = ({ isCurrentUser = false }: ProfileHeaderProps) => {
    const navigate = useNavigate();

    const [isFollowing, setIsFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");

    const postsImages: PostImage[] = [
        { url: "https://picsum.photos/id/32/800", likes: 124 },
        { url: "https://picsum.photos/id/45/800", likes: 89 },
        { url: "https://picsum.photos/id/90/800", likes: 256 },
        { url: "https://picsum.photos/id/102/800", likes: 42 },
        { url: "https://picsum.photos/id/66/800", likes: 311 },
        { url: "https://picsum.photos/id/150/800", likes: 158 },
    ];

    const savedImages: PostImage[] = [
        { url: "https://picsum.photos/id/101/800", likes: 87 },
        { url: "https://picsum.photos/id/70/800", likes: 224 },
        { url: "https://picsum.photos/id/200/800", likes: 145 },
    ];

    const handleEditProfile = () => navigate("/edit-profile");



    return (



        <div className="space-y-6 animate-fade-in">


            {/* PROFILE CARD */}
            <Card className="overflow-hidden border-0 sm:border shadow-none sm:shadow-md rounded-xl">


                <CardContent className="p-6">


                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">


                        {/* Avatar + Edit Button */}
                        <div className="flex flex-col items-center">

                            <div className="relative group mb-4">

                                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white dark:border-neutral-800 shadow-xl rounded-2xl">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="text-4xl font-semibold">JD</AvatarFallback>
                                </Avatar>

                                {isCurrentUser && (
                                    <Button
                                        size="icon"
                                        className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-white/80 backdrop-blur shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Camera size={16} className="text-primary" />
                                    </Button>
                                )}
                            </div>

                            {/* Edit / Follow Button */}
                            {isCurrentUser ? (
                                <Button
                                    className="w-full bg-primary text-white hover:bg-primary/90 shadow-md rounded-full"
                                    onClick={handleEditProfile}
                                >
                                    <Edit size={16} />
                                    Edit Profile
                                </Button>
                            ) : (
                                <Button
                                    variant={isFollowing ? "outline" : "default"}
                                    onClick={() => setIsFollowing(!isFollowing)}
                                    className={cn(
                                        "w-full rounded-full shadow-md",
                                        isFollowing && "bg-white text-primary border-primary"
                                    )}
                                >
                                    {isFollowing ? "Unfollow" : "Follow"}
                                    {isFollowing ? <UserCheck size={16} /> : <UserPlus size={16} />}
                                </Button>
                            )}
                        </div>

                        {/* USER INFO */}
                        <div className="flex-1 space-y-4">

                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-700">
                                    John Doe
                                </h1>
                                <div className="flex items-center gap-2 justify-start">
                                    <p className="text-muted-foreground">@johndoe</p>

                                    <button
                                        className="text-xs rounded-md hover:bg-muted/70 transition-all hover:cursor-pointer"
                                        onClick={() => {
                                            navigator.clipboard.writeText("@johndoe"),
                                            toast.success("Username copied to clipboard");
                                        }}
                                    >
                                        <Copy size={14} className="inline-block" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm leading-relaxed max-w-md">
                                Passionate creative exploring the intersection of art and technology.
                                Creating stories through visuals.
                            </p>

                            {/* Stats */}
                            <div className="flex gap-6 md:gap-12">
                                <ProfileStat value="48" label="Posts" />
                                <ProfileStat value="2.5k" label="Followers" />
                                <ProfileStat value="256" label="Following" />
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>

            {/* TABS */}
            <Card className="border-0 sm:border shadow-none sm:shadow-md rounded-xl">
                <div className="border-b flex text-sm font-medium">

                    <button
                        className={cn(
                            "flex-1 py-3 text-center",
                            activeTab === "posts"
                                ? "border-b-2 border-purple-600 text-purple-600 font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => setActiveTab("posts")}
                    >
                        <Grid size={16} className="inline mr-1" /> POSTS
                    </button>

                    {isCurrentUser && (
                        <button
                            className={cn(
                                "flex-1 py-3 text-center",
                                activeTab === "saved"
                                    ? "border-b-2 border-pink-600 text-pink-600 font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => setActiveTab("saved")}
                        >
                            <BookmarkCheckIcon size={16} className="inline mr-1" /> SAVED
                        </button>
                    )}

                </div>

                {/* POSTS GRID */}
                <CardContent className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">

                        {(activeTab === "posts" ? postsImages : savedImages).map((image, index) => (
                            <div key={index} className="aspect-square rounded-xl overflow-hidden relative group">
                                <img
                                    src={image.url}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-end pb-3">
                                    <div className="text-white flex items-center gap-1 font-medium">
                                        <Heart size={18} className="fill-red-500 text-red-500" />
                                        {image.likes}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileHeader;
