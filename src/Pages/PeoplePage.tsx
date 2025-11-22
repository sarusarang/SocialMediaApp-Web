
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, UserCheck, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SuspenseLoader from "../components/Loaders/SuspenseLoader";



// User interface
type User = {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    postCount: number;
};



// Mock users data
const PEOPLE: User[] = [
    {
        id: "user-2",
        username: "jane",
        displayName: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        bio: "Photographer and travel blogger",
        followers: 1289,
        following: 567,
        postCount: 86,
    },
    {
        id: "user-3",
        username: "mike",
        displayName: "Mike Johnson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        bio: "Tech enthusiast, coffee lover",
        followers: 782,
        following: 231,
        postCount: 45,
    },
    {
        id: "user-4",
        username: "sarah",
        displayName: "Sarah Wilson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        bio: "Artist and designer",
        followers: 934,
        following: 356,
        postCount: 67,
    },
    {
        id: "user-5",
        username: "alex",
        displayName: "Alex Brown",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        bio: "Software developer and gamer",
        followers: 432,
        following: 198,
        postCount: 29,
    },
];

const People = () => {



    const [searchQuery, setSearchQuery] = useState("");

    const [followingState, setFollowingState] = useState<Record<string, boolean>>({});

    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const searchInputRef = useRef<HTMLInputElement>(null);



    // Filter people based on search query
    const filteredPeople = PEOPLE.filter(person =>
        person.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.username.toLowerCase().includes(searchQuery.toLowerCase())
    );



    // Toggle follow state
    const toggleFollow = (userId: string) => {
        setFollowingState(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };



    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);



    // Focus search input when clicking on the search icon
    const focusSearchInput = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };



    // Clear search input
    const clearSearch = () => {
        setSearchQuery("");
        setIsSearchFocused(false);
        if (searchInputRef.current) {
            searchInputRef.current.blur();
        }
    };



    if (isLoading) {
        return <SuspenseLoader fullScreen text="Finding people..." />;
    }




    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 px-3 sm:px-0"   
        >

            <motion.h1
                className="text-2xl font-bold"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
                People to Follow
            </motion.h1>


            <motion.div
                className={`relative mb-6 transition-all duration-300 ${isSearchFocused ? 'scale-100' : 'scale-100'}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
            >

                <div className="relative">

                    <Search
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-all duration-300 ${isSearchFocused ? 'text-primary' : 'text-muted-foreground'}`}
                        onClick={focusSearchInput}
                    />


                    <Input
                        ref={searchInputRef}
                        placeholder="Search people"
                        className={`pl-10 pr-10 py-6 h-12 bg-muted/30 focus:bg-background transition-all duration-300 
              ${isSearchFocused ? 'ring-2 ring-primary/50 shadow-lg' : 'ring-0'}`}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />

                    {searchQuery && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            onClick={clearSearch}
                        >
                            <X className="h-4 w-4" />
                        </motion.button>
                    )}


                </div>


            </motion.div>

            <AnimatePresence>
                
                {filteredPeople.length === 0 ? (

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="text-center py-10 text-muted-foreground rounded-lg bg-muted/20 backdrop-blur-sm border border-border/30"
                    >
                        <span className="block mb-2">😕</span>
                        No results found for "{searchQuery}".
                    </motion.div>

                ) : (
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {filteredPeople.map((person, index) => (
                            <motion.div
                                key={person.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="transform transition-all duration-200"
                            >
                                <Card className="glass-card overflow-hidden">

                                    <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">

                                        <Avatar className="h-16 w-16 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
                                            <AvatarImage src={person.avatar} alt={person.displayName} />
                                            <AvatarFallback className="text-lg font-medium bg-primary text-primary">
                                                {person.displayName.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 min-w-0">
                                            <Link to={`/userprofile/${person.username}`} className="hover:underline">
                                                <h3 className="font-medium text-lg">{person.displayName}</h3>
                                            </Link>
                                            <p className="text-sm text-muted-foreground truncate">@{person.username}</p>
                                            <p className="text-sm mt-1 line-clamp-2">{person.bio}</p>

                                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                <span>{person.followers} followers</span>
                                                <span>{person.following} following</span>
                                                <span>{person.postCount} posts</span>
                                            </div>
                                        </div>

                                        <Button
                                            variant={followingState[person.id] ? "outline" : "default"}
                                            size="sm"
                                            onClick={() => toggleFollow(person.id)}
                                            className="ml-auto whitespace-nowrap self-center sm:self-start hover:cursor-pointer"
                                        >
                                            {followingState[person.id] ? (
                                                <>
                                                    <UserCheck className="h-4 w-4 mr-1" />
                                                    Unfollow
                                                </>
                                            ) : (
                                                <>
                                                    <UserPlus className="h-4 w-4 mr-1" />
                                                    Follow
                                                </>
                                            )}
                                        </Button>

                                    </CardContent>

                                </Card>

                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default People;