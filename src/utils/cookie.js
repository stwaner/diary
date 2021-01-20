// 设置cookie
export function setCookie (name, value, expireHours) {
  var cookieString = name + '=' + escape(value)
  // 判断是否设置过期时间
  if (expireHours > 0) {
    var date = new Date()
    date.setTime(date.getTime + expireHours * 3600 * 1000)
    cookieString = cookieString + '; expire=' + date.toGMTString()
  }
  document.cookie = cookieString
}

// 获取cookie
export function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim()
    if (c.indexOf(name) === 0) { return c.substring(name.length, c.length) }
  }
  return ''
}

// 删除cookie
export function deleteCookie (name) {
  var date = new Date()
  date.setTime(date.getTime() - 10000)
  document.cookie = name + '=v; expire=' + date.toGMTString()
}
