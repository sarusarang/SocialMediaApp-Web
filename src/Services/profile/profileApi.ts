import { CommonApi } from "@/lib/CommonApi";




// Get User Profile Details
export const GetUserProfileApi = async () => {

    return await CommonApi("GET", "/user/profile/");

}



// Edit User Profile Details
export const EditUserProfileApi = async (profileData: FormData) => {

    return await CommonApi("PATCH", "/user/profile", profileData);

}



// Get Professional Title
export const GetProfessionalTitleApi = async (search: string) => {

    const params = new URLSearchParams({ q : search });

    return await CommonApi("GET", `/external/list-professional-titles/?${params.toString()}`);

}