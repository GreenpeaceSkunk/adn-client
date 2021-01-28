import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosResquestError } from 'greenpeace';

const ApiCall = async <A>(config: AxiosRequestConfig) => {
  try {
    const response: AxiosResponse = await Axios.request({
      method: config.method,
      baseURL: 'https://unite.greenpeace.org.ar/ForMa',
      url: config.url,
      headers: {},
      data: config.data,
      params: config.params,
      
    });
    return response.data as A;
  } catch(e) {
    const {message, response } = e as AxiosError;
    return {
      error: true,
      status: response?.status,
      message,
      errorMessage: response?.data.errorMessage || '',
    } as AxiosResquestError;
  }
}

export { ApiCall };