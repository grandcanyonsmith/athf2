import axios  from 'axios';
import { getAccessToken } from '../actions/common';
import Constants from '../constants/appConstants';
import Method from '../constants/methodConstants';

export const api = async (apiUrl, type, apiData, isRetry) => {
    const obj = {
        method: type,
        url: apiUrl
    };
    if (apiData) {
        obj.data = apiData;
    }
    const token = getAccessToken();
    if (token) {
        obj.headers = {
            'Authorization': token
        };
    }
    if (apiUrl.indexOf('/uploadprofilephoto') !== -1) {
        obj.headers['Content-Type'] = 'multipart/formdata';
    }
    const response = await axios(obj).then(result => {
        return result;
    }).catch((err) => {
        if (err.response) {
            const errObj = {
                data: err.response.data,
                status: err.response.status
            };
            if (err.response.status != 401 && !isRetry) {
                const { config } = err.response;
                const logUrl = `${Constants.baseUrl}${Method.loginmobileerror}`;
                const reqBody = {
                    errorData: {
                        url: config.url,
                        payload: config.data ? JSON.parse(config.data) : '',
                        type: config.method,
                        error: JSON.stringify(errObj)
                    }
                };
                postApi(logUrl, reqBody, true);
            }
            return errObj;
          }
        return err;
    });

    return response;
}

export const getApi = async (url) => {
    const data = await api(url, 'get');
    return data;
};

export const postApi = async (url, data, isRetry) => {
    const response = await api(url, 'post', data, isRetry);
    return response;
};

export const putApi = async (url, data) => {
    const response = await api(url, 'put', data);
    return response;
};

export const deleteApi = async (url) => {
    const response = await api(url, 'delete');
    return response;
};