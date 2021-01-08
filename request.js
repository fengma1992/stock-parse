/**
 * @file request
 * @description
 * @author dujianhao
 * @date 2020-08-05
 */
const axios = require('axios')
const qs = require('qs')

module.exports = function getData({ year, month, day }, token) {
  console.log(token)
  const data = qs.stringify({
    question: `科创板，上市天数=537，个股热度，${year}年${month}月${day}日`,
    perpage: 50,
    page: 1,
    log_info: { 'input_type': 'typewrite' },
    source: 'Ths_iwencai_Xuangu',
    version: '2.0',
    add_info: { 'urp': { 'scene': 1, 'company': 1, 'business': 1 }, 'contentType': 'json' },
  })
  const hexinV = 'AyxdYDOkXwhijEs00JTT1gnS-wFd5dAO0ojkU4ZtOex6ssL3rvWgHyKZtO3V'
  const config = {
    method: 'post',
    url: 'http://www.iwencai.net/unifiedwap/unified-wap/v2/result/get-robot-data',
    headers: {
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'hexin-v': token,
      'Cookie': 'chat_bot_session_id=6215f1df29333f8ef294a0030e2eaa82; other_uid=Ths_iwencai_Xuangu_q9sn32s41xr1kxrxbjjyf0138mxluail; cid=0f17960d1829a1a2a018a566a1cf9aa81610017855; cid=0f17960d1829a1a2a018a566a1cf9aa81610017855; ComputerID=0f17960d1829a1a2a018a566a1cf9aa81610017855; WafStatus=0; PHPSESSID=60706550bb2c6470f6e0f690beca8787; v=A6zd4LMk34jH68u0eFdTVolSe4HdZVLxUg9kvgbquR_6MUJ3LnUgn6IZNHxV',
      'Connection': 'keep-alive',
      'Host': 'www.iwencai.com',
      'Origin': 'http://www.iwencai.com',
      'Referer': 'http://www.iwencai.com/unifiedwap/result?w=%E7%A7%91%E5%88%9B%E6%9D%BF%EF%BC%8C%E4%B8%8A%E5%B8%82%E5%A4%A9%E6%95%B0%3D537%EF%BC%8C%E9%97%AE%E8%B4%A2%E5%85%B3%E6%B3%A8%E5%BA%A6%EF%BC%8C2020%E5%B9%B41%E6%9C%881%E6%97%A5&querytype=&issugs&sign=1610072782019',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
      'DNT': '1',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
    },
    data: data,
  }

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function(response) {
        resolve(response.data)
      })
      .catch(function(error) {
        reject(error)
      })
  })
}
