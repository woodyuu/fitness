const express = require('express')
const app = express()
const port = 5000
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const usersRouter = require('../src/Components/Sub_Page/Server/Route/Users')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors())
// const corsOptions = {
//     // origin: 'http://127.0.0.1:3000',
//     origin: 'http://localhost:3000',
//     credentials: true
// }

mongoose.connect('mongodb+srv://woody:vhrvnd17@woody.uugxmbw.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('몽고DB 연결완료!'))
    .catch(e => {
        console.log(`몽고DB 연결 실패: ${e}`)
        // 적절한 에러 핸들링 수행
    })

// app.use(cors(corsOptions))
app.use(express.json())
app.use(logger('tiny'))
app.use('/api/users', usersRouter)

// 에러 핸들링 미들웨어 (맨 위에 위치)
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('인터넷 서버 오류')
})

// 404 처리 미들웨어 (맨 아래에 위치)
app.use((req, res, next) => {
    res.status(404).send('페이지 찾지 못함')
})

app.listen(port, () => {
    console.log(`서버 실행중 ${port}`)
})

module.exports = app