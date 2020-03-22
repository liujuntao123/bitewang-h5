const axios = require('axios');
import config from '@/config'
import { Toast } from 'mint-ui';
import router from '@/router'


axios.interceptors.response.use(function (response) {
  // 登录态被挤掉则重新登录
  console.log('response',response)
  if(response.data.result==405){
    Toast('你的账号已被登录，请重新登录')
    localStorage.clear();
    // router.push('login')
    window.location.reload()
    throw response.data
  }
  return response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default class base {
  // static baseUrl = config.baseUrl
  static baseUrl = process.env.NODE_ENV==='development'?'/api':config.baseUrl
  static get = axios.get
  static put = axios.put
  static post = axios.post
  static delete = axios.delete
}
