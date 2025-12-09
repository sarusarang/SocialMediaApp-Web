import ProfileLoader from "@/components/Loaders/Profile/ProfileLoader";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfilePosts from "@/components/Profile/ProfilePosts";
import { useGetUserProfile } from "@/Services/profile/useProfile";
import { useParams } from "react-router-dom";




export default function Profile() {


    // get user name of the user
    const { username } = useParams();



    // Profile Details
    const { data: userProfile, isFetching, isLoading, isError } = useGetUserProfile();



    // Error Ui
    if (isError) return <div>Something went wrong</div>



    // Loading Ui 
    if (isFetching || isLoading) return <ProfileLoader />



    return (

        <>

            <main className="transition-all duration-300 ease-in-out space-y-5">

                <ProfileHeader userProfile={userProfile} isCurrentUser={false} />

                <ProfilePosts />

            </main>

        </>

    )



}
