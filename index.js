/**
 * @file index
 * @description
 * @author dujianhao
 * @date 2020-08-04
 */

const fs = require('fs')
const converter = require('json-2-csv')
const getData = require('./request')

const JSON_PATH = 'json'
const INPUT_PATH = 'input'
const OUTPUT_PATH = 'output'

if (!fs.existsSync(JSON_PATH)) {
  fs.mkdirSync(JSON_PATH)
}
if (!fs.existsSync(INPUT_PATH)) {
  fs.mkdirSync(INPUT_PATH)
}
if (!fs.existsSync(OUTPUT_PATH)) {
  fs.mkdirSync(OUTPUT_PATH)
}


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

  let result = ''
  try {
    data = JSON.parse(data)
    result = data.answer.components[0].data.datas
    converter.json2csv(result, (err, csvData) => {
      if (err) {
        return console.log('converter csv error: ' + err)
      }
      const path = OUTPUT_PATH + '/' + fileName.split('.')[0] + '.csv'
      writeFile(path, csvData)
    }, { excelBOM: true })

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

// walk_dir(JSON_PATH, '', processJson)

function getCsvData({ year, month, day }) {

  getData({ year, month, day })
    .then(data => {
      const fileName = `${year}_${month}_${day}`
      const inputPath = INPUT_PATH + '/' + fileName
      const outputPath = OUTPUT_PATH + '/' + fileName
      writeFile(JSON.stringify(data), inputPath, '.json')
      const resultArr = data.answer.components[0].data.datas
      converter.json2csv(resultArr, (err, csvData) => {
        if (err) {
          return console.log('converter csv error: ' + err)
        }
        console.log(fileName)
        writeFile(csvData, outputPath, '.csv')
      }, { excelBOM: true })
    })
    .catch(e => {
      console.log('getData err:' + e.message)
    })
}

function traverseDate(startTimeStr, endTimeStr) {
  const startTime = new Date(startTimeStr)
  const endTime = new Date(endTimeStr)
  //遍历日期的方法
  //利用setTime获取两个日期之间差值,差值毫秒换算成天1000*60*60*24
  const distanceDayLength = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24)
  const startDay = startTime.getDate()
  for (let i = 0; i <= distanceDayLength; i++) {
    const currentTime = new Date(new Date(startTimeStr).setDate(startDay + i))

    const timeData = {
      year: currentTime.getFullYear(),
      month: String(currentTime.getMonth() + 1).padStart(2, '0'),
      day: String(currentTime.getDate()).padStart(2, '0'),
    }
    getCsvData(timeData)
  }
}

traverseDate('2020-07-01', '2021-01-01')
