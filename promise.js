
var p1 = new Promise(function () {
  $.ajax({
    url: './chinese.txt',
    datatype: 'json',
    success (data) {
      console.log(data)
    },
    error () {
      console.log('凉了')
    }
  })
})

var p2 = new Promise(function () {
  var iframe = document.createElement('iframe')
  iframe.src = "https://yang-shengyong.github.io"
  iframe.style.width = "100%"
  iframe.style.height = "800px"
  document.body.append(iframe)
})

Promise.race([p1, p2]).then(() => {
  console.log('所有异步都成功了')
}, (err) => {
  console.log(err)
})