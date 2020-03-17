const axios = require('axios');
import config from '@/config'


axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default class base {
  // static baseUrl = config.baseUrl
  static baseUrl = process.env.NODE_ENV==='development'?'/api':''
  static get = axios.get
  static put = axios.put
  static post = axios.post
  static delete = axios.delete
}
