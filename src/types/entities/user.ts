import { UserComparison } from "./userComparison";

export type User = {
    id: number;
    uuid: string;
    created_at: number;
    updated_at: number;
    deleted_at?: number;
    settings?: string;
    user_comparisons: UserComparison[];
    status: "unverified" | "active" | "inactive" | "blocked";
    first_name?: string;
    last_name?: string;
    nickname?: string;
    email: string;
    password: string;
    last_login_at?: number;
  };