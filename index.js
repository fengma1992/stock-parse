/**
 * @file index
 * @description
 * @author dujianhao
 * @date 2020-08-04
 */

const fs = require('fs')
const converter = require('json-2-csv')
const getData = require('./request')

const JSON_PATH = 'input'
const INPUT_PATH = 'input'
const OUTPUT_PATH = 'output'

if (!fs.existsSync(JSON_PATH)) {
  fs.mkdirSync(JSON_PATH)
}
if (!fs.existsSync(INPUT_PATH)) {
  fs.mkdirSync(INPUT_PATH)
} else {
  // fs.rmdirSync(INPUT_PATH, { recursive: true })
  // fs.mkdirSync(INPUT_PATH)
}
if (!fs.existsSync(OUTPUT_PATH)) {
  fs.mkdirSync(OUTPUT_PATH)
} else {
  // fs.rmdirSync(OUTPUT_PATH, { recursive: true })
  // fs.mkdirSync(OUTPUT_PATH)
}

const tokenList = [
  'A1wt8IO0b5jGFhvEHzAjJvkiK3EN1QPMgnEU3DZMaMcqgfJnXuXQj9KJ5E2F',
  'A9SlmMtsd3AePuM85yUrXrEaoxlFLfskOliMRG6kYN_iWXrPlj3Ip4phXMm9',
  'A0w9ABMEf2hWZmuUr34zdmlyG6F9hfMc8iME7KYcWPeaMeJXzpXAv0I51KX1',
  'A8S1qFu8R0CujvMMd9M7biGqk0m13et0qgp8lN50UA9SCWq_Bu241_oRTDEt',
  'AxtqNUhRwFXtSzyhBALcWwJPrHSG8CzBKQjzuQ1J95ox7DWilcC_QjnUg9ge',
  'A5Pi3ZAJyE0lc4QZzG3kc_qnJBy-SCQ54dFrIUWh77LpxL0KzRi3WvGs-7xW',
  'Awt6Rdih0CV9mwxxlKjsa7KfnKT2oBwRmbrjyX0Z58qhnCWSBXCvcqmEcxCO',
  'A4Py7SBZ2B21w5TpXAP0g2r3FEwu-BQJUYNbcbVx3-JZdK36PcinimFc64TG',
  'A_uKlWjxIPUN6xxBJH78uyIvjNRmUAxhCXTTGe2p1_oRTBVCdSCfohk0Y2j-',
  'A3MCPbCpKO1FE-S57NmE05oHBHyeqARZwS1LgSUBzxLJJJ2qrXiXutEM26w2',
  'A-uapfhBMMWdO2wRtASMy1J_fATWAPyxeQbDKV15xyqB_AUy5dCP0onkU8Bu',
  'A2MSTcD5OL3VY_SJfG-U4wpX9KwOWPSpMf870ZXRv0I51I2aHSiH6kG8y1Sm',
  'A9uq9QiRAJUti3zhROqcG8KPbDRGsOyB6dCzec0Jt1rxrPXiVYB_AvmUQ_je',
  'A1MinVBJCI1ls8RZDAWkM7rn5Nx-COT5oYkr4QVhr3KphH1Kjdh3GrFsuxwW',
  'A-ydIPPkn0i2Rot0D7qTlskSu8EdpZN8kl-kDEY8-Bc6UYI3brVg3-JZdPWV',
  'A2QVyDuc5yAObhPs19-bjoFKM2lV_YtUSjYctH6U8C_yKQqfpg1Y95ox7GHN',
  'A9ytcAM07xhGlptEn2Cjpnmiq_GNVYNMAuGUXLbM6EeqAXLn3mVQD1IJZI0F',
  'A1QlGEvs9_CevmO8Z5Wr3jGaI5nFrXukusgMxO4k4F9i2fpPFr1IJwrh3Ak9',
  'A6vaZbiBcAXde6xR9OxMixK_PMSWwLxxOc6D6R05h-pBvMVypZBPkkmkEyAu',
  'A4b3dgUmJWY45PECWauZiJew0XcL58mSnDD-GnC-cqmEcyjh2HcasWy7Tn9D',
  'AxdmIWz9BJlBH4AVo1sYhx6boIBiXOgdxSxvLWlVM-ZNmDm2cSx7DtUA_-x6',
  'A4_-ybSVDHGZRwiNa_4gv9bzGCiatOB1fRXn1aGNK_4FcKEeqYRzJo3Yd2iy',
  'Awd2cfxNFGnRb5DlMxEo144rkLDSDNhNNf5ffdnlIxa9SClm4dxrPkWw78Tq',
  'A38OGcTlHEEplxhd-0Qwz0YDCFgKZNCl7afX5RFdGy51IJHOGTRjVv2IZzAi',
  'A9anZjWWlVZoVKHyipPJuKcgIYfbdxkSbJtOCkAuwrlUA3jxqAdqwTxLnlsT',
  'A28eKVQ1bBG552gtixLAH_ZT-Ih6FMCVXUnHNYHtC17l0IG-ieRThm04V_iS',
  'A8a3tkXm5Sb4pLHCGh3ZyNdwEbdLJwlC3Ek-WrD-sunEs2ihGLda8az7jtOD',
  'A18ueeSFfOFJN3j9G5jQL2bj6LjqxLDFzTu3RfG9-45VgHFu-ZRDtt3oRyAC',
  'A5nor96nIv8Ttf5r0bm-YYwhro5wJo57dz6xc7tfFUA_wrc4A3adqAdqwbBI',
  'Ay5fbh3u_e7AHAkKcizxMD_4eY_zL_GKBNamEljmmjHsO8D5wL9COdSD9o8r',
  'A8e2MbyNVKkRr9Alc6nol05rUHCSzJgN9YYfPZml49Z9COmmoZwr_gVwr-Sq',
  'Ax5vvq0-zb5QbBnaAkaBQK8Iab9j3-H6dISWIsi2imFc67CpMG8yaUQz5teb',
  'A7fGQczdpHmh_yD1A8f4p_67QKACfIh9ZXgPTQl10wbtuNmWEUwbLnUgnzwa',
  'Aw5_zj2O3Y7gvGmqkpCRkN9YWe_Tj9Eq5HqGcjhGepHMm6CZoB8imbTj1t8L',
  'A6fWkVwttEkxTzDFkx2I927LMNByLHit1Sr_nXkFwzZdaMlGgfwLXuXQj3SK',
  'Ax9uOaTFvCGJd7g9W8CQ7yYjqHiqhHCFjfN3BbF9u04VQDGuuVQDdp2oB8DC',
  'A5fmoex9hBnBnwCVI6uYB54bIADi3GidRZzvrenVs2bNGLk28az7jlWAf6z6',
  'A8m4P6638o9jxY77IYyO8Xwx3v4gFr7hJyfhw2svRbDvsueos2bNGLda8R74',
  'AwNybaDZWJ01QxRp33V0A-p3lMyueJQT0SLb8TXxX2LZ9C16vUgnCuHca4pG',
  'A7nITz4Hwl_zFZ7LsfaeAexBzi6Qxq7Rl5XRE9v_NeBfYteYIxa9SCcK4WZo',
]

let tokenIndex = 0
let token = tokenList[tokenIndex]

const csvResult = {}
let fileCount = 0
let walkFinish = false

function walk_dir(JSON_PATH, path, callback) {
  console.log('walk_dir start...')
  const dirList = fs.readdirSync(JSON_PATH + path)
  dirList.forEach(function(item) {
    // 文件夹
    if (fs.statSync(JSON_PATH + path + '/' + item).isDirectory()) {
      return walk_dir(JSON_PATH, path + '/' + item, callback)
    }

    // 文件
    const filePath = path + '/' + item
    return callback(JSON_PATH, filePath, item)
  })
  console.log('walk_dir end...')
}


function processJson(JSON_PATH, path, fileName) {
  console.log('processJson start...')
  const pos = path.lastIndexOf('.')
  if (pos < 0) {
    return
  }
  const extension = path.substr(pos)
  if (extension !== '.json') {
    return
  }

  let data = fs.readFileSync(JSON_PATH + path, 'utf-8')

  try {
    const result = JSON.parse(data)
    const resultArr = result.data.answer[0].txt[0].content.components[0].data.datas
    resultArr.forEach(item => {
      const code = item.code
      if (!csvResult[code]) {
        csvResult[code] = []
      }
      csvResult[code][fileCount] = {
        '股票代码': item['股票代码'],
        '股票简称': item['股票简称'],
        '个股热度': getValueFromKey(item, '个股热度'),
        '日期': fileName.split('.')[0],
      }
    })
    fileCount++
    console.log(fileCount, fileName)
    if (fileCount === 184) {
      converter.json2csv(Object.values(csvResult).flat(), (err, csvData) => {
        if (err) {
          console.log('converter csvResult csv error: ' + err)
          return
        }
        const outputPath = `${OUTPUT_PATH}/csvResult`
        writeFile(csvData, outputPath, '.csv')
      }, { excelBOM: true })
    }

  } catch (e) {
    console.log('parse data err: ' + e)
  }
}

function writeFile(data, path, extention) {

  const fileName = path + extention
  console.log('writeFile start...')
  fs.unlink(fileName, function(err) {
    if (err) {
      if (err && err.message && err.message.indexOf('no such file or directory') > -1) {
        console.log(`generate ${fileName} success!`)
        fs.writeFileSync(fileName, data)
        return
      }
      throw err
    }
    fs.writeFileSync(fileName, data)
    console.log(`generate ${fileName} success!`)
  })
}


function getCsvData({ year, month, day }, token) {
  const fileName = `${year}_${month}_${day}`
  const inputPath = INPUT_PATH + '/' + fileName
  const outputPath = OUTPUT_PATH + '/' + fileName
  return new Promise((resolve, reject) => {
    if (fs.existsSync(`${inputPath}.json`)) {
      // console.log('exist ' + `${inputPath}.json`)
      return resolve()
    }
    getData({ year, month, day }, token)
      .then(result => {
        writeFile(JSON.stringify(result), inputPath, '.json')
        const resultArr = result.data.answer[0].txt[0].content.components[0].data.datas
        // converter.json2csv(resultArr, (err, csvData) => {
        //   if (err) {
        //     console.log('converter csv error: ' + err)
        //     return
        //   }
        //   console.log(fileName)
        //   writeFile(csvData, outputPath, '.csv')
        // }, { excelBOM: true })
        return resolve(resultArr)
      })
      .catch(e => {
        console.log('getData err:' + e.message)
        return reject()
      })
  })
}

function getValueFromKey(obj, keyPrefix) {
  for (let key in obj) {
    if (key.startsWith(keyPrefix)) {
      return obj[key]
    }
  }
}

function traverseDate(startTimeStr, endTimeStr) {
  const startTime = new Date(startTimeStr)
  const endTime = new Date(endTimeStr)
  //遍历日期的方法
  //利用setTime获取两个日期之间差值,差值毫秒换算成天1000*60*60*24
  const distanceDayLength = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24) + 1
  const startDay = startTime.getDate()
  let count = 0
  let i = 0

  function getData() {
    if (i >= distanceDayLength) {
      return
    }
    const currentTime = new Date(new Date(startTimeStr).setDate(startDay + i))

    const timeData = {
      year: currentTime.getFullYear(),
      month: String(currentTime.getMonth() + 1).padStart(2, '0'),
      day: String(currentTime.getDate()).padStart(2, '0'),
    }

    token = tokenList[tokenIndex]
    getCsvData(timeData, token)
      .then(result => {
        i++
        getData()
        if (!result) {
          return
        }

        count++
        console.log(count)
      })
      .catch(() => {
        tokenIndex++
        if (tokenIndex >= tokenList.length) {
          console.log('available token out')
          return
        }
        getData()
      })
  }
  getData()
}

// traverseDate('2020-07-01', '2020-12-31')

walk_dir(JSON_PATH, '', processJson)
