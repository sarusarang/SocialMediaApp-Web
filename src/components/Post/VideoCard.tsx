import { useEffect, useRef, useState, useCallback, memo } from "react";
import { Bookmark, BookmarkCheckIcon, Heart, MessageCircle, Volume2, VolumeX, Play, Pause, Maximize2, Minimize2, SkipForward, SkipBack } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";


// Video interface
interface Post {
    author: {
        username: string;
        displayName: string;
        avatar?: string;
    };
    content: string;
    video?: string;
    createdAt: string;
    comments: number;
    likes: number;
}


// VideoCard component
interface VideoCardProps {
    post: Post;
}

const VideoCard = ({ post }: VideoCardProps) => {


    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [loadError, setLoadError] = useState(false);



    // Utility function to format time
    const formatTime = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }, []);




    // Multiple approaches to get duration to ensure it loads correctly
    const handleMetadata = useCallback(() => {

        const video = videoRef.current;
        if (!video) return;

        // Use a timeout to ensure duration is properly loaded
        setTimeout(() => {
            if (video.duration && video.duration !== Infinity) {
                setDuration(video.duration);
                setIsLoaded(true);
            } else if (video.readyState >= 1) {
                // Fallback to readyState to check if metadata is loaded
                setDuration(video.duration);
                setIsLoaded(true);
            }
        }, 100);

        // Set initial volume and mute state
        video.volume = volume;
        video.muted = isMuted;

    }, [volume, isMuted]);




    // Update progress as video plays
    const handleTimeUpdate = useCallback(() => {

        if (!videoRef.current || videoRef.current.duration === 0) return;

        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(currentProgress);

        // Double check duration is set
        if (duration === 0 && videoRef.current.duration > 0) {
            setDuration(videoRef.current.duration);
            setIsLoaded(true);
        }

    }, [duration]);



    // Handle playing/pausing the video
    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().catch((error) => {
                console.error("Video playback error:", error);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    }, [isPlaying]);



    // Handle skip forward
    const skipForward = useCallback(() => {
        if (!videoRef.current || !duration) return;

        const newTime = Math.min(videoRef.current.currentTime + 10, duration);
        videoRef.current.currentTime = newTime;
        setProgress((newTime / duration) * 100);
    }, [duration]);



    // Handle skip backward
    const skipBackward = useCallback(() => {
        if (!videoRef.current) return;

        const newTime = Math.max(videoRef.current.currentTime - 10, 0);
        videoRef.current.currentTime = newTime;
        setProgress((newTime / duration) * 100);
    }, [duration]);



    // Handle muting/unmuting the video
    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;

        const newMutedState = !isMuted;
        videoRef.current.muted = newMutedState;
        setIsMuted(newMutedState);

        // If we're unmuting, restore the previous volume
        if (!newMutedState && volume === 0) {
            setVolume(0.5);
            videoRef.current.volume = 0.5;
        }
    }, [isMuted, volume]);



    // Handle volume change
    const handleVolumeChange = useCallback((value: number[]) => {
        if (!videoRef.current) return;

        const newVolume = value[0];
        setVolume(newVolume);
        videoRef.current.volume = newVolume;

        // If volume is set to 0, mute the video; otherwise, unmute
        if (newVolume === 0) {
            setIsMuted(true);
            videoRef.current.muted = true;
        } else if (isMuted) {
            setIsMuted(false);
            videoRef.current.muted = false;
        }
    }, [isMuted]);



    // Handle seeking on progress bar click
    const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current || !duration) return;

        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        const newTime = duration * clickPosition;

        videoRef.current.currentTime = newTime;
        setProgress((newTime / duration) * 100);
    }, [duration]);



    // Handle fullscreen toggle
    const toggleFullscreen = useCallback(() => {
        if (!videoContainerRef.current) return;

        if (!document.fullscreenElement) {
            videoContainerRef.current.requestFullscreen().catch((error) => {
                console.error("Fullscreen error:", error);
            });
        } else {
            document.exitFullscreen().catch((error) => {
                console.error("Exit fullscreen error:", error);
            });
        }
    }, []);



    // Handle likes
    const handleLike = useCallback(() => {
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    }, [isLiked]);



    // Handle save
    const handleSave = useCallback(() => {
        setIsSaved((prev) => !prev);
    }, []);



    // Set up intersection observer to play/pause video based on visibility
    useEffect(() => {
        
        if (!videoRef.current) return;

        const video = videoRef.current;


        // Set initial volume
        video.volume = volume;
        video.muted = isMuted;


        // Handle video errors
        const handleError = () => {
            console.error("Video loading error");
            setLoadError(true);
            setIsLoaded(true); // Set to true to hide loading indicator
        };


        // Handle video ended
        const handleEnded = () => {
            setIsPlaying(false);
        };


        // Create intersection observer with options better suited for video content
        observerRef.current = new IntersectionObserver(

            (entries) => {
                const [entry] = entries;

                // Only autoplay when fully visible
                if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                    if (video.paused && !loadError) {
                        video.play().catch(() => {
                            // Autoplay was prevented by browser
                            console.log("Autoplay prevented by browser");
                            setIsPlaying(false);
                        });
                        setIsPlaying(true);
                    }
                } else {
                    if (!video.paused) {
                        video.pause();
                        setIsPlaying(false);
                    }
                }
            },

            { threshold: [0.5, 0.7, 0.9] } // Multiple thresholds for more precise control
        );


        // Start observing
        if (video) {
            observerRef.current.observe(video);
        }


        // Force load metadata for Safari and mobile browsers
        if (video.readyState >= 1) {
            handleMetadata();
        }


        // Set up event listeners
        video.addEventListener('loadedmetadata', handleMetadata);
        video.addEventListener('loadeddata', handleMetadata); // Additional event for better coverage
        video.addEventListener('durationchange', handleMetadata); // This helps with Safari
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('error', handleError);


        // Fullscreen change event
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);



        // Clean up
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            video.removeEventListener('loadedmetadata', handleMetadata);
            video.removeEventListener('loadeddata', handleMetadata);
            video.removeEventListener('durationchange', handleMetadata);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('error', handleError);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };


    }, [isMuted, volume, handleMetadata, handleTimeUpdate]);



    return (

        <Card className="glass-card mb-5 animate-fade-in overflow-hidden shadow-none sm:shadow-md">

            <CardHeader className="p-4 pb-2 flex flex-row items-center space-y-0 gap-3">

                <Link to={`/profile/${post.author.username}`}>
                    <Avatar className="h-10 w-10 ring-2 ring-white/10 shadow-sm">
                        <AvatarImage src={post.author.avatar} alt={post.author.displayName} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                            {post.author.displayName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </Link>

                <div className="flex flex-col">
                    <Link to={`/profile/${post.author.username}`} className="font-medium hover:underline text-sm">
                        {post.author.displayName}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </span>
                </div>

            </CardHeader>

            <CardContent className="px-4 py-2">

                <p className="whitespace-pre-line mb-3 text-sm">{post.content}</p>

                {post.video && (

                    <div
                        ref={videoContainerRef}
                        className="video-container relative rounded-xl overflow-hidden bg-black aspect-video max-h-[70vh] mx-auto"
                        onMouseEnter={() => setShowControls(true)}
                        onMouseLeave={() => setShowControls(false)}
                    >
                        {!isLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-pulse-soft">
                                <div className="text-white font-medium px-4 py-2 rounded-full bg-black/30 backdrop-blur-md">
                                    Loading...
                                </div>
                            </div>
                        )}

                        {loadError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                <div className="text-white font-medium px-4 py-2 rounded-full bg-black/30 backdrop-blur-md">
                                    Failed to load video
                                </div>
                            </div>
                        )}

                        <video
                            ref={videoRef}
                            src={post.video}
                            className="w-full h-full object-contain"
                            loop
                            playsInline
                            muted={isMuted}
                            onClick={togglePlay}
                            preload="metadata"
                        />

                        {/* Central play/pause button - animated on state change */}
                        <div
                            className={cn(
                                "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                                isPlaying && !showControls ? "opacity-0" : "opacity-100"
                            )}
                            onClick={togglePlay}
                        >
                            <div className={cn(
                                "control-button p-3.5 bg-black/40 backdrop-blur-md rounded-full shadow-lg",
                                isPlaying ? "animate-scale-down" : "animate-scale-up"
                            )}>
                                {isPlaying ? (
                                    <Pause className="h-6 w-6 text-white" />
                                ) : (
                                    <Play className="h-6 w-6 text-white" />
                                )}
                            </div>
                        </div>

                        {/* Video controls overlay */}
                        <div className={cn(
                            "video-control-overlay absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-200",
                            showControls ? "opacity-100" : "opacity-0"
                        )}>
                            {/* Progress bar */}
                            <div
                                className="progress-bar h-1.5 mb-3 bg-gray-700/60 rounded-full overflow-hidden cursor-pointer"
                                onClick={handleSeek}
                            >
                                <div
                                    className="progress-fill h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                {/* Time display */}
                                <div className="text-white text-xs font-medium px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                                    {formatTime(duration * (progress / 100))} / {formatTime(duration)}
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Skip backward button */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white hover:bg-white/10 rounded-full p-1.5"
                                        onClick={skipBackward}
                                    >
                                        <SkipBack className="h-4 w-4" />
                                    </Button>

                                    {/* Skip forward button */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white hover:bg-white/10 rounded-full p-1.5"
                                        onClick={skipForward}
                                    >
                                        <SkipForward className="h-4 w-4" />
                                    </Button>

                                    {/* Volume controls */}
                                    <div className="relative">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-white hover:bg-white/10 rounded-full p-1.5"
                                            onClick={toggleMute}
                                            onMouseEnter={() => setShowVolumeSlider(true)}
                                            onMouseLeave={() => setShowVolumeSlider(false)}
                                        >
                                            {isMuted ? (
                                                <VolumeX className="h-4 w-4" />
                                            ) : (
                                                <Volume2 className="h-4 w-4" />
                                            )}
                                        </Button>

                                        {/* Volume slider */}
                                        <div
                                            className={cn(
                                                "volume-slider absolute z-10 left-2 bottom-full mb-2 bg-black/70 rounded-lg p-2 shadow-lg transition-all duration-200",
                                                showVolumeSlider ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                            )}
                                            onMouseEnter={() => setShowVolumeSlider(true)}
                                            onMouseLeave={() => setShowVolumeSlider(false)}
                                        >
                                            <Slider
                                                orientation="vertical"
                                                value={[volume]}
                                                min={0}
                                                max={1}
                                                step={0.05}
                                                onValueChange={handleVolumeChange}
                                                className="h-24"
                                            />
                                        </div>
                                    </div>

                                    {/* Fullscreen button */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white hover:bg-white/10 rounded-full p-1.5"
                                        onClick={toggleFullscreen}
                                    >
                                        {isFullscreen ? (
                                            <Minimize2 className="h-4 w-4" />
                                        ) : (
                                            <Maximize2 className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="p-3 pt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/40">

            
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={cn(
                        "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-full",
                        isLiked ? "text-red-500" : "text-gray-600 dark:text-gray-300"
                    )}
                >
                    <Heart className={cn("h-4 w-4 mr-1", isLiked && "fill-current")} />
                    <span className="text-xs font-medium">{likeCount}</span>
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-full text-gray-600 dark:text-gray-300"
                >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">{post.comments}</span>
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    className={cn(
                        "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-full",
                        isSaved ? "text-blue-500" : "text-gray-600 dark:text-gray-300"
                    )}
                >
                    {isSaved ? (
                        <BookmarkCheckIcon className="h-4 w-4 mr-1" />
                    ) : (
                        <Bookmark className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-xs font-medium">{isSaved ? "Saved" : "Save"}</span>
                </Button>


            </CardFooter>


        </Card>
    );
};


export default memo(VideoCard);
