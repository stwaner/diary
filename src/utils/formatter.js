// 格式化省市
export function listConvertTree(provinces, cities) {
  let root = null
  let list = []
  if (provinces && provinces.length) {
    provinces.forEach(item => {
      root = { children: [] }
      if (item.provinceCode !== null && item.provinceCode !== undefined) {
        root.label =  item.provinceName
        root.value =  item.provinceCode
        cities.forEach(city => {
          if (city.cityCode && city.provinceCode  === item.provinceCode) {
            root.children.push({
              label : city.cityName,
              value : city.cityCode
            })
          }
        })
        list.push(root)
      }
    })
  }
  return list
}