import { Product } from "./product";

export type Company = {
    id: number;
    uuid: string;
    created_at: number;
    updated_at: number;
    deleted_at?: number;
    settings?: string;
    products: Product[];
    name: string;
  };