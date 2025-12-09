import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ErrorUi from "@/components/Loaders/ErrorUi";
import { useGetUserProfile } from "@/Services/profile/useProfile";
import { Camera, User, CircleCheckBig, Loader } from "lucide-react";
import { useEditUserProfile } from "@/Services/profile/useProfile";
import EditProfileSkeleton from "@/components/Loaders/Profile/EditLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfessionalTitleSearch } from "@/components/Profile/ProfessionalTitleSearch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";





// profile validation
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB


// Form schema
const profileFormSchema = z.object({
    username: z.string().min(3, "Username is too short").max(20, "Username is too long"),
    fullname: z.string().min(3, "Display name is too short").max(35, "Display name is too long"),
    gender: z.string().optional(),
    date_of_birth: z.string().optional(),
    website: z.string().trim().optional().refine(
        (val) => !val || /^https?:\/\/.+\..+$/.test(val),
        { message: "Please enter a valid URL (e.g., https://example.com)" }
    ),
    bio: z.string().max(150, "Bio must be 150 characters or less").optional(),
    designation: z.string().optional(),
    profile_picture: z.any().optional()
        .refine((file) => !file || file instanceof File, "Invalid file")
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Max 2MB image allowed")
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg & .png allowed"
        ),
});





// Form type
type ProfileFormValues = z.infer<typeof profileFormSchema>;




const EditProfile = () => {



    // states 
    const navigate = useNavigate();

    const [avatarHover, setAvatarHover] = useState(false);

    const [preview, setPreview] = useState<string | null>(null);



    // Get user profile details
    const { data: userProfile, isFetching, isLoading, isError, refetch } = useGetUserProfile();



    // Edit user profile details
    const { mutate: editUserProfile, isPending } = useEditUserProfile();



    // Form
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
        defaultValues: {
            username: "",
            fullname: "",
            gender: "",
            date_of_birth: "",
            website: "",
            bio: "",
            designation: "",
            profile_picture: undefined,
        }
    });



    // Set default values in form
    useEffect(() => {
        if (userProfile) {
            form.reset({
                username: userProfile.username || "",
                fullname: userProfile.fullname || "",
                gender: userProfile.gender || "",
                date_of_birth: userProfile.date_of_birth || "",
                website: userProfile.website || "",
                bio: userProfile.bio || "",
                designation: userProfile.designation || "",
            });
            if (userProfile?.profile_picture) setPreview(userProfile?.profile_picture);
        }
    }, [userProfile, form, form.reset]);




    // Submit edit profile form
    const onSubmit = (data: ProfileFormValues) => {

        const formData = new FormData();

        formData.append("username", data.username);
        formData.append("fullname", data.fullname);
        formData.append("gender", data.gender || "");
        formData.append("date_of_birth", data.date_of_birth || "");
        formData.append("website", data.website || "");
        formData.append("bio", data.bio || "");
        formData.append("designation", data.designation || "");
        formData.append("profile_picture", data.profile_picture || "");

        editUserProfile(formData)

    };



    // Error Ui
    if (isError) return <ErrorUi retry={refetch} />



    // Loading Ui
    if (isLoading || isFetching) return <EditProfileSkeleton />


    

    return (



        <section aria-label="edit-profile" className="container w-full mx-auto py-0 sm:py-0 px-0 sm:px-4 animate-fade-in transition-all duration-300 ease-in-out">


            <Card className="bg-gradient-to-br from-background to-secondary/10 border-0 sm:border shadow-none sm:shadow-sm">


                <CardHeader className="pb-2 sm:pb-6">

                    <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                        <User size={20} />
                        Edit Profile
                    </CardTitle>

                    <CardDescription>Update your profile information and social media links</CardDescription>

                </CardHeader>


                <CardContent className="px-4 sm:px-8">


                    <Form {...form}>


                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">


                            {/* --------------- Profile Upload --------------- */}
                            <FormField
                                control={form.control}
                                name="profile_picture"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-center mb-6">
                                        <div className="flex justify-center">
                                            <div
                                                className="relative group cursor-pointer"
                                                onMouseEnter={() => setAvatarHover(true)}
                                                onMouseLeave={() => setAvatarHover(false)}
                                                onClick={() => document.getElementById("avatarUpload")?.click()}
                                            >
                                                <Avatar className="h-28 w-28 sm:h-40 sm:w-40 border-4 border-background transition-all duration-300 group-hover:border-white shadow-xl">
                                                    <AvatarImage
                                                        src={preview || "/images.png"}
                                                        alt="Profile"
                                                    />
                                                    <AvatarFallback className="text-xl sm:text-2xl">{userProfile?.fullname?.charAt(0)}</AvatarFallback>
                                                </Avatar>

                                                <div
                                                    className={`absolute inset-0 bg-black/40 rounded-full flex items-center justify-center transition-opacity duration-300 ${avatarHover ? "opacity-100" : "opacity-0"
                                                        }`}
                                                >
                                                    <Camera size={20} className="text-white" />
                                                </div>
                                            </div>

                                            <input
                                                id="avatarUpload"
                                                type="file"
                                                accept="image/png, image/jpeg, image/jpg"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        field.onChange(file);
                                                        setPreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </div>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />




                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">


                                {/* username */}
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


                                {/* Display Name */}
                                <FormField
                                    control={form.control}
                                    name="fullname"
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




                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">


                                {/* Date of Birth */}
                                <FormField
                                    control={form.control}
                                    name="date_of_birth"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel className="text-sm">Date of Birth</FormLabel>
                                            <FormControl>
                                                <input
                                                    type="date"
                                                    className="w-full px-3 py-2 rounded-lg bg-background border border-muted-foreground/20 text-sm transition-all duration-300 ease-in-out  hover:border-muted-foreground/40"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                {/* Gender */}
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">Gender</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="dark:bg-transparent text-sm w-full h-10 rounded-lg border-muted-foreground/30">
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                                {/* Website */}
                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">Website</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="url"
                                                    placeholder="https://yourwebsite.com"
                                                    {...field}
                                                    className="rounded-lg"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                {/* Professional Title */}
                                <ProfessionalTitleSearch form={form} />

                            </div>


                            {/* Bio */}
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-sm">Bio</FormLabel>

                                        <FormControl>
                                            <Textarea
                                                placeholder="Bio"
                                                {...field}
                                                maxLength={150}
                                                className="resize-none min-h-[80px] sm:min-h-[100px] pr-12"
                                            />
                                        </FormControl>

                                        {/* Character Counter */}
                                        <p className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                                            {field.value?.length || 0}/150
                                        </p>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />




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
                                    variant="outline"
                                    size="lg"
                                    disabled={isPending}
                                    className="hover:cursor-pointer flex items-center text-sm sm:text-sm"
                                >
                                    Save Changes {isPending ? <Loader size={16} className="animate-spin duration-1000 mt-1" /> : <CircleCheckBig size={16} className="mt-1" />}  
                                </Button>

                            </CardFooter>

                        </form>

                    </Form>

                </CardContent>

            </Card>

        </section>

    );

};

export default EditProfile;