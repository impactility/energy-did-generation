import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

const axiosClient = axios.create({
  baseURL: process.env.ISSUER_NODE_URL,
  timeout: 30000,
  headers,
  auth: {
    username: process.env.ISSUER_API_AUTH_USER || '',
    password: process.env.ISSUER_API_AUTH_PASSWORD || '',
  },
});

export { axiosClient };
