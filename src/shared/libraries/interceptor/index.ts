import axios from 'axios';
import {cleanParams, showMessage} from "@app/shared";
import {BASE_URL} from '@configurations/environment';

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

instance.interceptors.request.use(function (config) {
    if (config.params) {
        config.params = cleanParams(config.params)
    }
    return config;
}, function (error) {
    return Promise.reject(error)
})

instance.interceptors.response.use(
    response => response,
    error => {
        if (error?.response?.status <= 499 && error?.response?.status !== 401) {
            showMessage(error?.response?.data?.message ?? 'Oops! An error occurred. Please try again later.', 'error', 10000)
        } else if (error?.response?.status >= 500) {
            showMessage('Internal server error', 'error', 15000)
        }
        return Promise.reject(error)
    }
)

export default instance
