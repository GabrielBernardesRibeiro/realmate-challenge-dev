import client from "./client";
import type { AxiosResponse, AxiosError, Method } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const BASE_LOCAL_URL = process.env.NEXT_PUBLIC_API_URL_NEXT || "";

export interface ApiResponse<T = any> {
  status: number;
  data: T;
}

interface SendRequestInterface {
  method: Method;
  endpoint: string;
  headers?: Record<string, string>;
  body?: any;
  local?: boolean;
}

const api = async <T = any>({
  method,
  endpoint,
  body = {},
  headers = {},
  local = false,
}: SendRequestInterface): Promise<ApiResponse<T>> => {
  try {
    const url = `${local ? BASE_LOCAL_URL : BASE_URL}${endpoint}`;

    const response: AxiosResponse<T> = await client.request({
      method,
      url,
      headers,
      data: body,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    const error = err as AxiosError<T>;

    return {
      status: error.response?.status || 500,
      data: (error.response?.data || {}) as T,
    };
  }
};

export default api;
