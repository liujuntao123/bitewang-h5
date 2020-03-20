/**
 * 线上配置数据处理
 */

import api from '@/api'
import storage from '@/utils/storage'

// onlineconfig过期时间设为6小时
const expire_time = 60 * 60 * 6

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
  static sortByLevel(arr, key = 'level') {
    return arr.sort((a, b) => b[key] - a[key])
  }
  static getOnlineConfig() {
    let config = storage.getFromLocalStorage('onlineconfig')
    if (config) {
      return Promise.resolve(config)
    }
    return api.getOnlineConfig().then(res => {
      let config = res.config
      // config=window.atob(config.slice(2))
      // config=JSON.parse()
      config = decodeURIComponent(config)
      config = getQueryVariable(config)
      storage.setToLocalStorage(config, 'onlineconfig', expire_time)
      return config
    })
  }
  static findBlacklist(config) {
    let blacklist = []
    if (config.blacklist && Array.isArray(config.blacklist.channels)) {
      let channel =
        config.blacklist.channels.find(item => item.channel == window.d) || {}
      blacklist = channel.category || []
    }
    return blacklist
  }
  static findBlackColumns(config) {
    let blackcolumns = []
    if (config.blacklist && Array.isArray(config.blacklist.channels)) {
      let channel =
        config.blacklist.channels.find(item => item.channel == window.d) || {}
      blackcolumns = channel.content || []
    }
    return blackcolumns
  }
}
