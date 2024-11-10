export type Product = {
    id: number;
    uuid: string;
    created_at: number;
    updated_at: number;
    deleted_at?: number;
    settings?: string;
    company_id?: number;
    name: string;
    description: string;
  };