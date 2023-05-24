import { ElMessage } from 'element-plus';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useUserStore } from '@/stores/user';
//VITE_APP_API_BASE_URL
console.log(import.meta.env.VITE_API_BASEPATH); //dev
console.log(import.meta.env.VITE_APP_API_BASE_URL); //http://xxx

const axiosConfig: {
  base_url: {
    dev: string;
    pro: string;
  };
  result_code: number | string;
  default_headers: AxiosHeaders;
  request_timeout: number;
} = {
  base_url: {
    dev: '',
    pro: '',
  },
  result_code: '0000',
  request_timeout: 60000,
  default_headers: 'application/json',
};

const service: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  // timeout:axiosConfig.request_timeout
});

// request拦截器
// 每次请求在 header 中带上 token
service.interceptors.request.use((config: AxiosRequestConfig | any) => {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  if (
    config.method === 'post' &&
    (config.headers as AxiosRequestHeaders)['Content-Type'] ===
      'application/x-www-form-urlencoded'
  ) {
    config.data = JSON.stringify(config.data);
  }
  if (config.method === 'get' && config.params) {
    let url = config.url as string;
    url += '?';
    const keys = Object.keys(config.params);
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`;
      }
    }
    url = url.substring(0, url.length - 1);
    config.params = {};
    config.url = url;
  }
  return config;
});

// response 拦截器(拦截每一次响应，判断是否 token 失效,如果 token 失效就退出登录并提示信息)
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === 'blob') {
      return response;
    }
    const res = response.data;
    const userStore = useUserStore();
    // token 无效
    if (res.code === 401) {
      ElMessage({
        message: res.message || '页面长时间未使用，请重新登录',
        type: 'warning',
        duration: 5000,
      });
      userStore.logout();
      return Promise.reject(new Error(res.message || 'Error'));
    } else if (res.code !== 200) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5000,
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error: AxiosError) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

const request = (option: any) => {
  const { url, method, params, data, headersType, responseType } = option;
  return service({
    url: url,
    method,
    params,
    data,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || axiosConfig.default_headers,
    },
  });
};

export default {
  get: <T = any>(option: any) => {
    return request({ method: 'get', ...option }) as unknown as T;
  },
  post: <T = any>(option: any) => {
    return request({ method: 'post', ...option }) as unknown as T;
  },
  delete: <T = any>(option: any) => {
    return request({ method: 'delete', ...option }) as unknown as T;
  },
  put: <T = any>(option: any) => {
    return request({ method: 'put', ...option }) as unknown as T;
  },
};
