import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface MediaPreviewProps {
    file: File | null;
    onRemove: () => void;
}

export default function MediaPreview({ file, onRemove }: MediaPreviewProps) {

    const [preview, setPreview] = useState<string | null>(null);

    const [isVideo, setIsVideo] = useState(false);

    useEffect(() => {

        if (!file) {
            setPreview(null);
            return;
        }

        const isVideoFile = file.type.startsWith("video/");
        setIsVideo(isVideoFile);

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Free memory when component unmounts
        return () => {
            URL.revokeObjectURL(objectUrl);
        };

    }, [file]);

    if (!preview) return null;

    return (

        <div className="relative rounded-lg overflow-hidden animate-scale-in flex justify-center">

            <div className="aspect-square relative max-h-[60vh] flex items-center justify-center bg-black/5 dark:bg-white/5 backdrop-blur-sm">
                {isVideo ? (
                    <video
                        src={preview}
                        controls
                        className="max-h-full max-w-full object-contain"
                    />
                ) : (
                    <img
                        src={preview}
                        alt="Preview"
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                    />
                )}
            </div>

            <button
                onClick={onRemove}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                aria-label="Remove media"
            >
                <X size={20} />
            </button>
            
        </div>
    );
}