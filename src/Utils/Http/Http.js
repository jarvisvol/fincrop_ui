import axios from 'axios';

const API_URL = 'https://localhost:8000/api'

const accessToken = window.localStorage.getItem('accessToken');

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.accessToken = accessToken;

export default axios;