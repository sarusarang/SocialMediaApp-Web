import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetUserProfileApi, EditUserProfileApi , GetProfessionalTitleApi } from "./profileApi";
import type { AxiosErrorType } from "@/types/AxiosType";
import type { UserProfileType } from "./types";
import { toast } from "sonner";





// Hook to Get User Profile Details
export const useGetUserProfile = () => {

    return useQuery<UserProfileType>({

        queryKey: ["userProfile"],

        queryFn: async () => {

            return await GetUserProfileApi() as UserProfileType;

        },
        refetchOnWindowFocus: false,
        retry: 1,

    })

}





// Hook to Get Professional Title
export const useGetProfessionalTitle = (search: string) => {

    return useQuery<string []>({

        queryKey: ["professional-title" , search],

        queryFn: async () => {

            return await GetProfessionalTitleApi(search) as string [];

        },
        refetchOnWindowFocus: false,
        retry: 1,

    })

}




// Hook to edit User Profile Details
export const useEditUserProfile = () => {


    const queryClient = useQueryClient();


    return useMutation({

        mutationFn: async (profileData: FormData) => {

            return await EditUserProfileApi(profileData);

        },
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            toast.success("Profile Updated Successfully");

        }, onError: (error: AxiosErrorType) => {

            toast.error("Oops..!", { description: error?.message, duration: 5000 })
            console.log("Edit Profile Error", error);

        }

    })

}