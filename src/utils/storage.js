export default class storage {
  static getFromLocalStorage(itemName) {
    let _itemName = itemName.toLowerCase()
    let data
    var timestamp = Date.parse(new Date())
    var data_expiration = localStorage.getItem(
      'data_expiration_' + _itemName.toLowerCase()
    )
    if (data_expiration && data_expiration > timestamp) {
      //如果有缓存，且缓存没有过期
      data = localStorage.getItem(_itemName)
      data = JSON.parse(data)
    }
    return data
  }

  /**
   *
   *
   * @param {*} data
   * @param {*} itemName
   * @param {*} expire_time
   * @memberof storage
   */
  static setToLocalStorage(data, itemName, expire_time) {
    let _itemName = itemName.toLowerCase()
    var timestamp = Date.parse(new Date())
    var expiration = timestamp + expire_time * 1000
    localStorage.setItem(_itemName, JSON.stringify(data))
    localStorage.setItem('data_expiration_' + _itemName, expiration)
  }
}
