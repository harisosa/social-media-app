import type { AxiosRequestConfig } from "axios";
import { http } from "./axios";
import { ApiResponse } from "@/lib/http/types";

export const api = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const res = await http.request<ApiResponse<T>>(config);
  return res.data.data;
};