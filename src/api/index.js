import base from './base'

const BaList = 'BaList'
const BaInfo='Ba'
const weiboList='WeiboList'
const twitterList='TwitterListByUser'
const BtcTalkList='BtcTalkList'
const onLineConfig='OnlineConfig'
const MobileSms='MobileSms'
const PreReg='PreReg'
const Reg='Reg'
const CheckMobile='CheckMobile'
const Login='Login'
const ResetPwd='ResetPwd'

export default class api extends base {
  // static getBaList(keyword) {
  //   const url = `${this.baseUrl}/${BaList}?keyword=${keyword||''}&d=wxapp`
  //   return this.get(url)
  // }
  static getBaList(data) {
    const url = `${this.baseUrl}/${BaList}`
    return this.post(url,data)
  }
  static getBaInfo(id) {
    const url = `${this.baseUrl}/${BaInfo}?id=${id||''}&d=${window.d}`
    return this.get(url)
  }
  static getWeiboListAll(data){
    const url = `${this.baseUrl}/${weiboList}`
    return this.post(url,data)
  }
  static getTwitterList(data){
    const url = `${this.baseUrl}/${twitterList}`
    return this.post(url,data)
  }
  static getBtcTalkList(data){
    const url = `${this.baseUrl}/${BtcTalkList}`
    return this.post(url,data)
  }
  static mobileSms(data){
    const url = `${this.baseUrl}/${MobileSms}`
    return this.post(url,data)
  }
  static preReg(data){
    const url = `${this.baseUrl}/${PreReg}`
    return this.post(url,data)
  }
  static reg(data){
    const url = `${this.baseUrl}/${Reg}`
    return this.post(url,data)
  }
  static checkMobile(data){
    const url = `${this.baseUrl}/${CheckMobile}`
    return this.post(url,data)
  }
  static login(data){
    const url = `${this.baseUrl}/${Login}`
    return this.post(url,data)
  }
  static resetPwd(data){
    const url = `${this.baseUrl}/${ResetPwd}`
    return this.post(url,data)
  }
  static getOnlineConfig(){
    const url=`${this.baseUrl}/${onLineConfig}?d=${window.d}`
    return this.get(url)
  }
  static getOnlineConfig(){
    const url=`${this.baseUrl}/${onLineConfig}?d=wxapp`
    return this.get(url)
  }
}
