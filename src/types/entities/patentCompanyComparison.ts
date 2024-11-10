import { Company } from "./company";
import { Patent } from "./patent";

export type ComparisonResult = {
    id: number;
    name: string;
    description: string;
    infringement_reason: string;
  }[]

export type PatentCompanyComparison = {
    id: number;
    uuid: string;
    created_at: number;
    updated_at: number;
    deleted_at?: number;
    settings?: string;
    patent: Patent;
    patent_id: number;
    company: Company;
    company_id: number;
    // user_comparisons: UserComparison[];
    comparison_results: ComparisonResult;
    potential_infringement_product_ids?: number[];
  };