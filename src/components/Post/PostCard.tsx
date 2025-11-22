import { useState } from "react";
import { Bookmark, BookmarkCheckIcon, Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface Post {
    author: {
        username: string;
        displayName: string;
        avatar?: string;
    };
    content: string;
    image?: string;
    createdAt: string;
    comments: number;
    likes: number;
}

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {


    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const [likeCount, setLikeCount] = useState(post.likes);

    const [isLiked, setIsLiked] = useState(false);

    const [issaved , setIssaved] = useState(false)

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };


    return (

        <Card className="glass-card mb-5 animate-fade-in overflow-hidden shadow-none sm:shadow-md">

            <CardHeader className="p-4 pb-0 flex flex-row items-center space-y-0 gap-3">

                <Link to={`/profile/${post.author.username}`}>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={post.author.avatar} alt={post.author.displayName} />
                        <AvatarFallback>{post.author.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Link>

                <div className="flex flex-col">
                    <Link to={`/profile/${post.author.username}`} className="font-medium hover:underline">
                        {post.author.displayName}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </span>
                </div>

            </CardHeader>


            <CardContent className="p-4">

                <p className="whitespace-pre-line mb-3">{post.content}</p>

                {post.image && (
                    <div className={cn(
                        "relative rounded-md overflow-hidden bg-muted/50 transition-opacity",
                        !isImageLoaded && "animate-pulse"
                    )}>
                        <img
                            src={post.image}
                            alt="Post attachment"
                            className={cn(
                                "w-full h-auto object-cover rounded-md",
                                !isImageLoaded && "opacity-0"
                            )}
                            onLoad={() => setIsImageLoaded(true)}
                        />
                        {!isImageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-pulse-soft">Loading image...</div>
                            </div>
                        )}
                    </div>
                )}
                
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-border/40">

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={cn("hover:bg-muted transition-colors hover:cursor-pointer", isLiked && "text-red-500")}
                >
                    <Heart className={cn("h-4 w-4 mr-1", isLiked && "fill-current")} />
                    <span>{likeCount}</span>
                </Button>

                <Button variant="ghost" size="sm" className="hover:bg-muted transition-colors hover:cursor-pointer">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{post.comments}</span>
                </Button>

                <Button variant="ghost" size="sm" onClick={() => setIssaved(!issaved)} className={cn("hover:bg-muted transition-colors hover:cursor-pointer", issaved && "text-red-500")}>
                    {issaved ? "Saved" : "Save"}
                    {issaved ? <BookmarkCheckIcon className="h-4 w-4 mr-1" /> : <Bookmark className="h-4 w-4 mr-1" />}
                </Button>
                
            </CardFooter>


        </Card>
    );
};

export default PostCard;
