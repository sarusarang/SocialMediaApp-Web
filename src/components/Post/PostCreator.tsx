import React, { useState, useRef } from "react";
import { Image, Video, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MediaPreview from "./MediaPreview";
import { toast } from "sonner";

export default function PostCreator() {

    const [content, setContent] = useState("");
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);



    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMediaFile(e.target.files[0]);
        }
    };



    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };



    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };


    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };



    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");

            if (isImage || isVideo) {
                setMediaFile(file);
            } else {
                toast.error("Please upload only images or videos");
            }
        }
    };



    const openFileSelector = (type: "image" | "video") => {
        if (fileInputRef.current) {
            // Set accept attribute based on type
            fileInputRef.current.accept = type === "image" ? "image/*" : "video/*";
            fileInputRef.current.click();
        }
    };


    const removeMedia = () => {
        setMediaFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };



    const handleSubmit = () => {
        if (!content.trim() && !mediaFile) {
            toast.error("Please add some content or media to your post");
            return;
        }

        // Here you would handle your actual post submission
        toast.success("Post created successfully!");
        setContent("");
        setMediaFile(null);
    };


    return (

        <div className="w-full mx-auto">

            <div
                className={`rounded-2xl p-4 bg-background border shadow-lg neo-blur transition-all duration-300 ${isDragging
                        ? "ring-2 ring-primary scale-[1.01]"
                        : "ring-0"
                    }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >

                <div className="mb-4 text-sm font-medium text-center">
                    <h2 className="text-lg font-semibold mb-1">Create Post</h2>
                    <p className="text-muted-foreground text-xs">Share your thoughts and media</p>
                </div>

                {mediaFile ? (
                    <MediaPreview file={mediaFile} onRemove={removeMedia} />
                ) : (
                    <div className="flex items-center justify-center h-60 sm:h-72 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mb-4 bg-gray-50 dark:bg-gray-900/50 transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 animate-pulse-soft">
                        <div className="text-center p-4">
                            <p className="text-muted-foreground text-sm">
                                Drag and drop an image or video here, or click one of the buttons below
                            </p>
                        </div>
                    </div>
                )}

                <Textarea
                    value={content}
                    onChange={handleContentChange}
                    placeholder="What's on your mind?"
                    className="min-h-24 mb-4 transition-all duration-300 focus:ring-1 focus:ring-primary"
                />

                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => openFileSelector("image")}
                            className="rounded-full h-10 w-10 transition-transform hover:scale-105"
                        >
                            <Image size={18} />
                            <span className="sr-only">Add image</span>
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => openFileSelector("video")}
                            className="rounded-full h-10 w-10 transition-transform hover:scale-105"
                        >
                            <Video size={18} />
                            <span className="sr-only">Add video</span>
                        </Button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    <Button
                        onClick={handleSubmit}
                        className="rounded-full px-5 transition-transform hover:scale-105"
                    >
                        <Send size={18} className="mr-2" />
                        Post
                    </Button>
                </div>
            </div>
        </div>
    );
}