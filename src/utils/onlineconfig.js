/**
 * 线上配置数据处理
 */
import api from '@/api'
function getQueryVariable(str) {
  let arr = str.split('&')
  let obj = {}
  for (let item of arr) {
    let [key, value] = item.split('=')
    // obj[key] = JSON.parse(value)
    obj[key] = value
  }
  return obj
}

export default class Data {
  
  static sortByLevel(arr,key='level'){
    return arr.sort((a, b) => b[key] - a[key])
  }
  static getOnlineConfig(){
    return api.getOnlineConfig().then(res => {
      let config = res.config
      // config=window.atob(config.slice(2))
      // config=JSON.parse()
      config = decodeURIComponent(config)
      config = getQueryVariable(config)
      return config
    })
  }
  static findBlacklist(config){
    let blacklist=[]
    if(config.blacklist&&Array.isArray(config.blacklist.channels)){
      let channel=config.blacklist.channels.find(item=>item.channel==window.d)||{}
      blacklist=channel.category||[]
    }
    return blacklist
  }
  static findBlackColumns(config){
    let blackcolumns=[]
    if(config.blacklist&&Array.isArray(config.blacklist.channels)){
      let channel=config.blacklist.channels.find(item=>item.channel==window.d)||{}
      blackcolumns=channel.content||[]
    }
    return blackcolumns
  }
}
