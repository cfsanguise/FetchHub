const express = require('express')
const path = require('path')
const mongodb = require('mongodb')
const multer = require('multer')

const server = express()
const public = path.join(__dirname, '../public')

const storageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({storage: storageEngine})

server.use(express.static(public))
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// const client = mongodb.MongoClient

// const url = 'mongodb://127.0.0.1:27017'
// const databaseName = 'fetch'

// let db

// client.connect(url, {useNewUrlParser: true}, (error, client) => {
//     if (error) {
//         return console.log(error)
//     }
//     db = client.db(databaseName)
//     console.log('Database is ok')
// })

server.get('/', (req, res) => {
    res.sendFile('/public/index.html')
})

server.post('/new', upload.single('file'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.send('prinyato')
})


server.listen(3000, () => console.log('Server is running'))