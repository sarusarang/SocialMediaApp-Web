import { Grid, Heart, MessageCircle, SquarePlay } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";





interface PostImage {
    url: string;
    likes: number;
}




export default function ProfilePosts() {


    const [activeTab, setActiveTab] = useState<"posts" | "videos">("posts");


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



    return (


        <section className="animate-fade-in">


            {/* TABS */}
            <Card className="border-0 sm:border shadow-none sm:shadow-md rounded-xl">


                <div className="border-b flex text-sm font-medium">

                    <button
                        className={cn(
                            "flex-1 py-3 text-center hover:cursor-pointer",
                            activeTab === "posts"
                                ? "border-b-2 border-purple-600 text-purple-600 font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => setActiveTab("posts")}
                    >
                        <Grid size={23} className="inline mr-1" />
                    </button>


                    <button
                        className={cn(
                            "flex-1 py-3 text-center hover:cursor-pointer",
                            activeTab === "videos"
                                ? "border-b-2 border-pink-600 text-pink-600 font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => setActiveTab("videos")}
                    >
                        <SquarePlay size={25} className="inline mr-1" />
                    </button>

                </div>


                {/* POSTS GRID */}
                <CardContent className="p-4">

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">

                        {(activeTab === "posts" ? postsImages : savedImages).map((image, index) => (

                            <div key={index} className="aspect-square rounded-xl overflow-hidden relative group">

                                <img
                                    src={image.url}
                                    loading="lazy"
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-end pb-3 gap-5">
                                    <div className="text-white flex items-center gap-1 font-medium">
                                        <Heart size={18} className="fill-red-500 text-red-500" />
                                        {image.likes}
                                    </div>
                                    <div className="text-white flex items-center gap-1 font-medium">
                                        <MessageCircle size={18} className="text-white" />
                                        {image.likes}
                                    </div>
                                </div>

                            </div>

                        ))}

                    </div>

                </CardContent>

            </Card>


        </section>


    )


}
