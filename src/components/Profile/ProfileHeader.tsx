import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProfileStat from "./ProfileStats";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, UserCheck, UserPlus, Copy } from "lucide-react";
import { UserProfileType } from "@/Services/profile/types";




// Profile Header Props
interface ProfileHeaderProps {
    isCurrentUser: boolean;
    userProfile?: UserProfileType;
}



const ProfileHeader = ({ isCurrentUser, userProfile }: ProfileHeaderProps) => {



    // Navigation Hooks
    const navigate = useNavigate();


    
    // Edit Profile redirect
    const handleEditProfile = () => navigate("/edit-profile");



    return (



        <section className="animate-fade-in">


            {/* PROFILE CARD */}
            <Card className="overflow-hidden border-0 sm:border shadow-none sm:shadow-md rounded-xl">


                <CardContent className="px-4 sm:p-6">


                    <div className="flex flex-col md:flex-row gap-2 md:gap-8">


                        {/* Avatar + Edit Button */}
                        <div className="flex flex-col items-center">

                            <div className="relative group mb-4">

                                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white dark:border-neutral-800 shadow-xl rounded-full">
                                    <AvatarImage src={userProfile?.profile_picture ?? "/images.png"} />
                                    <AvatarFallback className="text-4xl font-semibold">
                                        {userProfile?.fullname?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                            </div>

                            {/* Edit / Follow Button */}
                            {isCurrentUser ? (
                                <Button
                                    className="w-full bg-primary text-white hover:bg-primary/90 shadow-md rounded-full hover:cursor-pointer"
                                    onClick={handleEditProfile}
                                >
                                    <Edit size={16} />
                                    Edit Profile
                                </Button>
                            ) : (
                                <Button
                                    variant={userProfile?.is_following ? "outline" : "default"}
                                    className={cn(
                                        "w-full rounded-full shadow-md hover:cursor-pointer",
                                        userProfile?.is_following && "bg-white text-primary border-primary"
                                    )}
                                >
                                    {userProfile?.is_following ? "Unfollow" : "Follow"}
                                    {userProfile?.is_following ? <UserCheck size={16} /> : <UserPlus size={16} />}
                                </Button>
                            )}
                        </div>



                        {/* USER INFO */}
                        <div className={`flex-1 space-y-2 ${userProfile?.bio ? "mt-0" : "mt-5"}`}>


                            {/* Full Name & Username */}
                            <div>
                                
                                <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-700 pb-1">
                                    {userProfile?.fullname}
                                </h1>

                                <div className="flex items-center gap-2 justify-start">
                            
                                    <p className="text-muted-foreground">{userProfile?.username}</p>

                                    <button
                                        className="text-xs rounded-md hover:bg-muted/70 transition-all hover:cursor-pointer"
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${userProfile?.username}`);
                                            toast.success("Username copied to clipboard");
                                        }}
                                    >
                                        <Copy size={14} className="inline-block" />
                                    </button>
                            
                                </div>
                            
                            </div>


                            {/* Bio */}
                            <p className="text-sm leading-relaxed max-w-md text-start">
                                {userProfile?.bio} 
                            </p>


                            {/* 🌐 Website Link */}
                            <a
                                href={userProfile?.website ?? ""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary font-medium hover:underline w-fit block"
                            >
                                {userProfile?.website}
                            </a>


                            {/* Stats */}
                            <div className="flex gap-6 md:gap-12">
                                <ProfileStat value={"12"} label="Posts" />
                                <ProfileStat value={userProfile?.followers_count} label="Followers" />
                                <ProfileStat value={userProfile?.following_count} label="Following" />
                            </div>

                        </div>

                    </div>

                </CardContent>


            </Card>


        </section>

    );
};

export default ProfileHeader;
