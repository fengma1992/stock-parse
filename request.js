/**
 * @file request
 * @description
 * @author dujianhao
 * @date 2020-08-05
 */
const axios = require('axios')
const qs = require('qs')


module.exports = function getData({ year, month, day }) {
  const data = qs.stringify({
    business_cat: 'soniu',
    codelist: '',
    comp_id: '5362418',
    condition: `[{"chunkedResult":"问财关注度, _&_生物医药,_&_${year}年${month}月${day}日","opName":"and","opProperty":"","sonSize":2,"relatedSize":0},{"dateText":"${year}年${month}月${day}日","indexName":"问财关注度","indexProperties":["交易日期 ${year}${month}${day}"],"dateUnit":"日","source":"new_parser","type":"index","indexPropertiesMap":{"交易日期":"${year}${month}${day}"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","uiText":"${year}年${month}月${day}日的问财关注度","sonSize":0,"queryText":"${year}年${month}月${day}日的问财关注度","relatedSize":0,"tag":"[${year}年${month}月${day}日]问财关注度"},{"indexName":"所属同花顺行业","indexProperties":["概念id 300769","包含T15"],"source":"new_parser","type":"index","indexPropertiesMap":{"概念id":"300769","包含":"T15"},"reportType":"null","valueType":"_所属同花顺行业","domain":"abs_股票领域","uiText":"所属同花顺行业是生物医药","sonSize":0,"queryText":"所属同花顺行业是生物医药","relatedSize":0,"tag":"所属同花顺行业"}]`,
    'date_range[0]': `${year}${month}${day}`,
    'iwc_token	': '',
    'logid': 'b6d0eb93f683b99a5e3af9cd92bbc4c5',
    'page': '1',
    'perpage': '1000',
    'query': `问财关注度, 生物医药，${year}年${month}月${day}日`,
    'query_type': 'stock',
    'ret': 'json_all',
    'sessionid': 'c0849f90057fa6811d1f081cae785fe7',
    'urp_sort_index': '',
    'urp_sort_way': '',
    'urp_use_sort': '1',
    'user_id': '530945201',
    'uuid': '24087',
    'uuids[0]': '24087',
  })
  const config = {
    method: 'post',
    url: 'http://www.iwencai.net/unifiedwap/unified-wap/v2/result/get-robot-data',
    headers: {
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
        console.log(error)
        reject(error)
      })
  })
}
