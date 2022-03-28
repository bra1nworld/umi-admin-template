import axios from 'axios';

const env = process.env;
const BASE_URL = env.NODE_ENV == 'prod' ? '' : '';

const Request = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  withCredentials: true,
});

export default Request;
