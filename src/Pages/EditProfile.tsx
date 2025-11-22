
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Camera, User, Instagram, Twitter, Link as LinkIcon, Mail, Award, CircleCheckBig } from "lucide-react";


const profileFormSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(30),
    displayName: z.string().min(1, "Display name is required"),
    title: z.string().max(50, "Title must be 50 characters or less").optional(),
    bio: z.string().max(160, "Bio must be 160 characters or less"),
    height: z.string().optional(),
    measurements: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    website: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
});


type ProfileFormValues = z.infer<typeof profileFormSchema>;


const EditProfile = () => {


    const navigate = useNavigate();

    const [avatarHover, setAvatarHover] = useState(false);

    const defaultValues: ProfileFormValues = {
        username: "johndoe",
        displayName: "John Doe",
        title: "Photographer & Digital Artist",
        bio: "Passionate creative exploring the intersection of art and technology. Based in San Francisco, traveling the world capturing moments and creating memories.",
        height: "6'1&quot; (185 cm)",
        measurements: "40-32-40",
        instagram: "johndoe",
        twitter: "johndoe",
        website: "johndoe.com",
        email: "john@example.com",
    };


    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
    });


    const onSubmit = (data: ProfileFormValues) => {

        console.log("Form submitted:", data);

        navigate("/profile");

    };

    return (

        <div className="container w-full sm:max-w-7xl mx-auto py-0 sm:py-0 px-0 sm:px-4 animate-fade-in transition-all duration-300 ease-in-out">


            <Card className="bg-gradient-to-br from-background to-secondary/10 border-0 sm:border shadow-none sm:shadow-sm">


                <CardHeader className="pb-2 sm:pb-6">

                    <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                        <User size={20} />
                        Edit Profile
                    </CardTitle>

                    <CardDescription>Update your profile information and social media links</CardDescription>

                </CardHeader>


                <CardContent>

                    <div className="flex justify-center mb-6">
                        <div
                            className="relative group cursor-pointer"
                            onMouseEnter={() => setAvatarHover(true)}
                            onMouseLeave={() => setAvatarHover(false)}
                            onTouchStart={() => setAvatarHover(true)}
                            onTouchEnd={() => setAvatarHover(false)}
                        >
                            <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-background transition-all duration-300 group-hover:border-purple-200">
                                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                                <AvatarFallback className="text-xl sm:text-2xl">JD</AvatarFallback>
                            </Avatar>

                            <div className={`absolute inset-0 bg-black/40 rounded-full flex items-center justify-center transition-opacity duration-300 ${avatarHover ? 'opacity-100' : 'opacity-0'}`}>
                                <Camera size={20} className="text-white" />
                            </div>
                        </div>
                    </div>


                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="displayName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">Display Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Display name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2 text-sm">
                                            <Award size={16} className="text-amber-500" />
                                            Professional Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., Photographer & Digital Artist"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us about yourself in 160 characters or less"
                                                {...field}
                                                className="resize-none min-h-[80px] sm:min-h-[100px]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                                <FormField
                                    control={form.control}
                                    name="height"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">Height</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 6'1&quot; (185 cm)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="measurements"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">Measurements</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 40-32-40" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <h3 className="text-base sm:text-lg font-medium mt-6 sm:mt-8 mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Social Media Links</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                                <FormField
                                    control={form.control}
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-sm">
                                                <Instagram size={16} className="text-pink-500" />
                                                Instagram
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="instagram username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="twitter"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-sm">
                                                <Twitter size={16} className="text-blue-500" />
                                                Twitter
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="twitter username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-sm">
                                                <LinkIcon size={16} className="text-green-500" />
                                                Website
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="your website" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-sm">
                                                <Mail size={16} className="text-purple-500" />
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <CardFooter className="px-0 pt-4 flex gap-2 justify-end">

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/")}
                                    size="lg"
                                    className="text-sm sm:text-sm hover:cursor-pointer"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="hover:cursor-pointer flex items-center bg-gradient-to-r from-primary to-pink-700 hover:from-primary hover:to-pink-900 text-white border-0 shadow-md hover:shadow-lg text-sm sm:text-sm"
                                >
                                    Save Changes  <CircleCheckBig size={16} className="mt-1" />
                                </Button>

                            </CardFooter>

                        </form>

                    </Form>

                </CardContent>
            </Card>
        </div>
    );
};

export default EditProfile;