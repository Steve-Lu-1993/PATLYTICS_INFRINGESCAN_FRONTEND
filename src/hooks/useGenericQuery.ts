import { getAppBackend } from "@/apis/backend/calls";
import { useQuery } from "@tanstack/react-query";

export type GenericQueryParamsType = {
    endpoint: string;
    token?: string;
    uid?: string;
    filters?: { [key: string]: any } | null;
    data?: any;
    statement?: string;
    page?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    queryParams?: string;
    enabled?: boolean;
    dependencies?: any[];
    refetchOnWindowFocus?: boolean, 
    refetchOnMount?: boolean,
    refetchOnReconnect?: boolean,
  };
  
  
  export const useGenericQuery = ({
    endpoint,
    token,
    uid,
    filters,
    page,
    pageSize,
    sortField,
    sortOrder,
    queryParams,
    enabled = true,
    dependencies = [],
    refetchOnWindowFocus = true,
    refetchOnMount = true,
    refetchOnReconnect = true,
  }: GenericQueryParamsType) => {
  
    let queryString = "";
    if (filters) {
      const filterString = Object.entries(filters)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
      queryString += filterString;
    }
    if (page !== undefined) queryString += `${queryString ? '&' : ''}page=${page}`;
    if (pageSize !== undefined) queryString += `${queryString ? '&' : ''}limit=${pageSize}`;
    if (sortField) queryString += `${queryString ? '&' : ''}sortField=${encodeURIComponent(sortField)}`;
    if (sortOrder) queryString += `${queryString ? '&' : ''}sortOrder=${encodeURIComponent(sortOrder)}`;
    if (queryParams) queryString += `${queryString ? '&' : ''}${queryParams}`;
  
    // 提取 endpoint 中的部分作為 queryKey 的一部分
    const endpointParts = endpoint.split("/");
    const queryCategory = endpointParts[1] || "";
    const queryFunction = endpointParts[2] || "";
    const querySubFunc = endpointParts[3] || "";
  
    // 動態構建 queryKey，保持與原始結構一致
    const queryKey = [
      queryCategory,
      queryFunction,
      ...(querySubFunc ? [querySubFunc] : []),
      ...(queryString ? [queryString] : []),
      ...dependencies, // 確保 dependencies 不重複包含主要 queryKey 部分
    ].filter(key => key !== null && key !== undefined && key !== "");
  
    // console.log("Constructed queryKey:", queryKey);
  
    return useQuery({
      queryKey: queryKey,
      queryFn: () => getAppBackend({ endpoint, queryString, token, uid }),
      enabled,
      refetchOnWindowFocus, 
      refetchOnMount,
      refetchOnReconnect,
    });
  };