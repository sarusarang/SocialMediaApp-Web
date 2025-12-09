import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfilePosts from "@/components/Profile/ProfilePosts";
import { useGetUserProfile } from "@/Services/profile/useProfile";
import ProfileLoader from "@/components/Loaders/Profile/ProfileLoader";
import ErrorUi from "@/components/Loaders/ErrorUi";





export default function UsersProfile() {



    // User Profile Details
    const { data: userProfile, isFetching, isLoading, isError , refetch } = useGetUserProfile();



    // Error Ui
    if (isError) return <ErrorUi retry={refetch} />



    // Loading Ui 
    if (isFetching || isLoading) return <ProfileLoader />




    return (

        <>

            <main className="transition-all duration-300 ease-in-out space-y-0 sm:space-y-5">

                <ProfileHeader userProfile={userProfile} isCurrentUser={true} />

                <ProfilePosts />

            </main>

        </>

    )


}
