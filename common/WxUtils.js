const log4js = require('../config/Log4j');
const logger = log4js.getLogger('error')
const axios = require('axios');
const config = require('../config');

const wxGetAccessToken = async () => {
  // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
//   let accessToken = await getValue('accessToken')
    let accessToken
 
    try {
      const result = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.AppID}&secret=${config.AppSecret}`)
      
      if (result.status === 200) {
        // 说明请求成功
        // await setValue('accessToken', result.data.access_token, result.data.expires_in)
        accessToken = result.data.access_token
        // {"errcode":40013,"errmsg":"invalid appid"}
        if (result.data.errcode && result.data.errmsg) {
          logger.error(`Wx-GetAccessToken Error: ${result.data.errcode} - ${result.data.errmsg}`)
        }
      }
    //   console.log('auth.result',result)
    } catch (error) {
      logger.error(`GetAccessToken Error: ${error.message}`)
    //   console.log('auth.result',error.message)
    }
  
  return accessToken
}

// 内容安全
const wxMsgCheck = async (content) => {
    // POST https://api.weixin.qq.com/wxa/msg_sec_check?access_token=ACCESS_TOKEN
    const accessToken = await wxGetAccessToken()
    console.log(accessToken)
    try {
      const result = await axios.post(`https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${accessToken}`, { content })
      if (result.status === 200) {
        console.log('wxMsgCheck -> result.data', result.data)
        return result.data
      } else {
        logger.error(`wxMsgCheck Error: ${result.statis}`)
      }
    } catch (error) {
      logger.error(`wxMsgCheck Error: ${error.message}`)
    }
  }

  module.exports ={ 
  
    wxGetAccessToken,
    wxMsgCheck,
   
  }