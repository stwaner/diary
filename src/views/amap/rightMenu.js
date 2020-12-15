/**
 * 右键菜单
 */
let menu = null
export function RightMenuContext (params) { // { map: "", ...}
  // console.log(params)
  menu = new Amap.ContextMenu(params.map) // 创建右键菜单
  var content = []
  content.push("<div class='info context_menu'>")
  content.push("  <p onclick='menu.zoomMenu(0)'>缩小</p>")
  content.push("  <p class='split_line' onclick='menu.zoomMenu(1)'>放大</p>")
  content.push("  <p class='split_line' onclick='menu.distanceMeasureMenu()'>距离量测</p>")
  content.push("  <p onclick='menu.addMarkerMenu()'>添加标记</p>")
  content.push('</div>')

  // 通过content自定义右键菜单内容
  this.contextMenu = new Amap.ContextMenu({ isCustom: true, content: content.join('') })

  this.mouseTool = new AMap.MouseTool(map) // 地图中添加鼠标工具MouseTool插件

  this.contextMenuPositon = null

  var content = []

  content.push("<div class='info context_menu'>");
  content.push("  <p onclick='menu.zoomMenu(0)'>缩小</p>");
  content.push("  <p class='split_line' onclick='menu.zoomMenu(1)'>放大</p>");
  content.push("  <p class='split_line' onclick='menu.distanceMeasureMenu()'>距离量测</p>");
  content.push("  <p onclick='menu.addMarkerMenu()'>添加标记</p>");
  content.push("</div>")

  //通过content自定义右键菜单内容
  this.contextMenu = new AMap.ContextMenu({ isCustom: true, content: content.join('') })
}
