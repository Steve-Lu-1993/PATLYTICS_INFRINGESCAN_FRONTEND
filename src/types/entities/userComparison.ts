import { PatentCompanyComparison } from "./patentCompanyComparison";
import { User } from "./user";

export type UserComparison = {
    id: number;
    uuid: string;
    created_at: number;
    updated_at: number;
    deleted_at?: number;
    settings?: string;
    status: "active" | "archived";
    user: User;
    user_id: number;
    patentCompanyComparison: PatentCompanyComparison;
    patent_company_comparison_id: number;
  };
  