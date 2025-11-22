import { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Dummy API fetch simulation
const fetchDummyResults = (query: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockUsers = [
                { id: 1, name: "Sarang A", avatar: "https://i.pravatar.cc/40?img=1" },
                { id: 2, name: "Aarav Kumar", avatar: "https://i.pravatar.cc/40?img=2" },
                { id: 3, name: "Priya Sharma", avatar: "https://i.pravatar.cc/40?img=3" },
            ];

            const mockVideos = [
                { id: 101, title: "React Tutorial", type: "video" },
                { id: 102, title: "Travel Vlog Kerala", type: "video" },
            ];

            const mockImages = [
                { id: 201, title: "Sunset Beach", type: "image" },
                { id: 202, title: "Mountain Trek", type: "image" },
            ];

            const results = [
                ...mockUsers.filter((u) => u.name.toLowerCase().includes(query.toLowerCase())),
                ...mockVideos.filter((v) => v.title.toLowerCase().includes(query.toLowerCase())),
                ...mockImages.filter((i) => i.title.toLowerCase().includes(query.toLowerCase())),
            ];

            resolve(results);
        }, 500);
    });
};

export default function ModernSearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const placeholders = [
        "Search users...",
        "Search videos...",
        "Search images...",
        "Find something cool...",
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        fetchDummyResults(query).then((data: any) => {
            setResults(data);
            setLoading(false);
        });
    }, [query]);

    return (
        <div className={cn("hidden sm:flex relative flex-1 max-w-md transition-all duration-300", isFocused ? "max-w-2xl" : "max-w-xl")}>
            <motion.div layout className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                {/* Animated Placeholder */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <AnimatePresence mode="wait">
                        {!query && (
                            <motion.span
                                key={placeholderIndex}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.25 }}
                                className="text-sm"
                            >
                                {placeholders[placeholderIndex]}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <Input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9 w-full h-11 bg-muted/30 border-muted focus:bg-background rounded-2xl"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </motion.div>

            {/* Dropdown */}
            <AnimatePresence>
                {query && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-14 left-0 w-full bg-background shadow-xl border rounded-2xl p-3 z-50 max-h-[22rem] overflow-y-auto backdrop-blur-lg"
                    >
                        {loading && <p className="p-2 text-muted-foreground text-sm">Searching...</p>}

                        {!loading && results.length === 0 && (
                            <p className="p-2 text-muted-foreground text-sm">No results found.</p>
                        )}

                        {/* Results */}
                        {results.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -6 }}
                                className="p-3 hover:bg-muted rounded-xl cursor-pointer flex items-center justify-between group transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    {item.avatar && <img src={item.avatar} className="h-9 w-9 rounded-full" />}

                                    {item.type && (
                                        <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-lg">
                                            {item.type === "video" ? "🎬" : "🖼️"}
                                        </div>
                                    )}

                                    <span className="font-medium text-sm">
                                        {item.name || item.title}
                                    </span>
                                </div>

                                {/* Flow Button */}
                                {item.avatar && (
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="opacity-0 group-hover:opacity-100 transition-all rounded-full px-3"
                                    >
                                        View <ArrowRight className="h-4 w-4 ml-1" />
                                    </Button>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}