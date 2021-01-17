import Axios from 'axios';

const
    API_HOST = process.env.REACT_APP_API_HOST,
    API_PATH = process.env.REACT_APP_API_PATH;

export const API_ENDPOINT = `${API_HOST}${API_PATH}`;

export const BASE_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const AxiosInstance = Axios.create({
    baseURL: API_ENDPOINT,
    timeout: 0,
    headers: BASE_HEADERS
});

AxiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

AxiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const { response } = error;

    let data = null, status = 500;

    if (response) {
        ({ data, status } = response);
    }

    if (data && data.errors) {
        return Promise.reject({
            status,
            ...data
        });
    } else {
        console.log(error);
        return Promise.reject({
            status,
            errors: [
                {
                    msg: 'Ha ocurrido un error inesperado, por favor vuelva a intentarlo.'
                }
            ]
        });
    }
});

export default AxiosInstance;