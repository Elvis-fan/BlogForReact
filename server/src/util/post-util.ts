
// 解析上下文里node原生请求的POST参数
export function getPostData<T>(ctx): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      let postdata = ''
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener('end', () => {
        try {
          resolve(JSON.parse(postdata))
        } catch (e) {
          let parseData = parseQueryStr(postdata)
          resolve(parseData as any)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}
