import AppBackendApi from "./main";

type GetAppBackendType = {
    endpoint: string;
    token?: string;
    uid?: string;
    queryString?: string;
  };
  
  type PostAppBackendType = {
    endpoint: string;
    token?: string;
    uid?: string;
    filters?: {};
    data: {} | {}[];
    dataFilters?: {};
  };
  
  type PutAppBackendType = {
    endpoint: string;
    token?: string;
    queryString?: string;
    data: any;
  };

export const getAppBackend = async ({
    endpoint,
    token,
    uid,
    queryString = "",
  }: GetAppBackendType) => {

    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      if (uid) {
        headers['uid'] = uid;
      }
      const response = await AppBackendApi.get(`${endpoint}?${queryString}`, { headers });
      return response.data;
    } catch (error:any) {
      console.error("Error fetching data:", error);
    }
  };

  export const postAppBackend = async ({
    endpoint,
    uid,
    token,
    filters,
    data, // 这里的 data 可能是 FormData
    dataFilters,
  }: PostAppBackendType) => {
    try {
      let reqBody;
      const headers: Record<string, string> = {};
  
      // 如果 data 是 FormData 对象，直接使用它作为请求体
      if (data instanceof FormData) {
        reqBody = data;
        headers['Content-Type'] = 'multipart/form-data'; // 确保 Axios 自动处理 Content-Type
      } else {
        // 如果 data 不是 FormData，按照原来的逻辑合并请求体
        reqBody = {
          filters,
          data,
          dataFilters,
        };
      }
  
      if (uid) {
        headers['uid'] = uid;
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
  
      const res = await AppBackendApi.post(`${endpoint}`, reqBody, { headers });
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  export const putAppBackend = async ({
    endpoint,
    queryString = "",
    data,
  }: PutAppBackendType) => {
    try {
      const res = await AppBackendApi.put(`${endpoint}?${queryString}`, data);
      return res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  export const deleteAppBackend = async ({
    endpoint,
  }: PutAppBackendType) => {
    try {
      const res = await AppBackendApi.delete(`${endpoint}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }