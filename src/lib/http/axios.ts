import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "@/lib/store";
import { ApiError } from "./errors";
import { getMessage } from "./message";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const http = axios.create({
  baseURL,
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.accessToken;

  config.headers = config.headers ?? {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const isFormData =
    typeof FormData !== "undefined" && config.data instanceof FormData;

  if (isFormData) {
    delete (config.headers as Record<string, unknown>)["Content-Type"];
    delete (config.headers as Record<string, unknown>)["content-type"];
  } else {
    if (!config.headers["Content-Type"] && !config.headers["content-type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    const status = err.response?.status ?? 0;
    const payload = err.response?.data;

    const message =
      getMessage(payload) ??
      err.message ??
      (status ? `Request failed: ${status}` : "Network error");

    return Promise.reject(new ApiError(message, status, payload));
  }
);