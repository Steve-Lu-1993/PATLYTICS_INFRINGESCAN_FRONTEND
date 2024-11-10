import { User } from "./user";

export type UserAccessToken = {
    id: number;
    created_at: number;
    updated_at: number;
    deleted_at?: number;
    settings?: string;
    user: User;
    user_id: number;
    access_token: string;
    refresh_token: string;
    access_token_expires_at: number;
    refresh_token_expires_at: number;
  };
  