// httpService.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';

// 创建 Axios 实例
const http: AxiosInstance = axios.create({
    baseURL: '/', // 替换为你的 API 基础 URL
    timeout: 10000, // 请求超时时间（毫秒）
});

// 请求拦截器
http.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                if (!config.headers) {
                    // 使用 AxiosHeaders 来初始化 headers
                    config.headers = new AxiosHeaders();
                }
                config.headers.set('Authorization', `Bearer ${token}`);
            }
            return config;
        } catch (error) {
            console.error('请求拦截器处理token时发生错误:', error);
            return config;
        }
    },
    (error: AxiosError): Promise<AxiosError> => {
        console.error('请求拦截器发生错误:', error);
        return Promise.reject(error);
    }
);

// 可选的响应拦截器
http.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        // 可以在这里处理响应数据
        return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
        // 处理响应错误，例如 token 过期
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default http;