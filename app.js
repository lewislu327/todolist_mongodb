
// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const port = 3000

// 設定首頁路由
app.get('/', (req, res) => {
  res.send('hello world ')
})

app.listen(port, () => {
  console.log('this app is running on localhost:3000')
})