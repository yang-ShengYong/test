var str = "鸡你"
var strLen = str.length - 1
var lastChinese = ""
var index = 0

var startTime = Date.now()

for (var i = 0; ; i++) {
  var num_10 = 19968 + parseInt(Math.random() * 20901)
  var str_16 = num_10.toString(16)
  str_16 = "\\u" + str_16
  lastChinese = eval("'" + str_16 + "'")
  if (lastChinese == str[index]) {
    if (index == strLen) {
      console.log("found!")
      console.log("在第" + " " + i + " " + "位打印出来了" + "\"" + str + "\"")
      break
    }
    index++
  } else {
    index = 0
  }
}
var endTime = Date.now()
var spendTime = endTime - startTime
console.log("用时：" + " " + spendTime + "ms")
