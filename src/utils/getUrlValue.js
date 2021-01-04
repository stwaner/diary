export function getQueryVariable(variable) {
  var query = window.location.search.substring(1)
  var vars = query.split("&")
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=")
    if(pair[0] == variable){return pair[1]}
  }
  return null
}

// 获取hash模式的Url
export function getQueryString (name, search) {
  search = search ||  window.location.search.substr(1) || window.location.hash.split("?")[1];
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  let r = search.match(reg);
  if (r != null) return  unescape(r[2]); return null;
}