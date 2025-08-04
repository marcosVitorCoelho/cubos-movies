/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig } from "axios";
axios.defaults.headers["Content-Type"] = "application/json";

declare module "axios" {
  export interface AxiosInstance {
    request<T>(config: AxiosRequestConfig): Promise<T>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig | any,
    ): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

export const buildAxios = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.request.use(async (config) => {
    try {
      config.headers.Authorization = `bearer ${import.meta.env.VITE_TMDB_TOKEN}`;
    } catch (error) {
      console.log(error);
    }

    return config;
  });

  return axiosInstance;
};

export const apiBase = buildAxios({
  baseURL: import.meta.env.VITE_BASE_API,
});
