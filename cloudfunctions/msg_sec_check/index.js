
// 云函数入口文件 index.js
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.security.msgSecCheck({
      content: event.text
    })

    if (result && result.errCode.toString() === '87014') {
      return { code: 500, msg: '内容含有违法违规内容', data: result }
    } else {
      return { code: 200, msg: 'ok', data: result }
    }
  } catch (err) {
    // 错误处理
    if (err.errCode.toString() === '87014') {
      return { code: 500, msg: '内容含有违法违规内容', data: err }
    }
    return { code: 502, msg: '调用security接口异常', data: err }
  }
}