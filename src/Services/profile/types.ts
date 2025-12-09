

export interface UserCreditVault {
  id: number;
  username: string;
  total_credits: string;
  total_value: string;
  gained_credits: string;
  spent_credits: string;
  purchased_credits: string;
  created_at: string;
  updated_at: string;
  user: number;
}



export interface UserProfileType {
  id: number;
  username: string;
  user_credit_vault: UserCreditVault;
  followers_count: number;
  following_count: number;
  is_following: boolean;
  user_posted_images: any[]; 
  user_posted_videos: any[]; 
  account_id: string;
  designation: string | null;
  bio: string | null;
  profile_picture: string | null;
  location: string | null;
  website: string | null;
  fullname: string;
  date_of_birth: string | null;
  gender: string | null;
  address: string | null;
  account_plan: string;
  plan_purchase_date: string | null;
  plan_expiry_date: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_deleted: boolean;
  deleted_at: string | null;
  user: number;
}
