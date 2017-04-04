import express from 'express'
import path from 'path'
import compression from 'compression'
import bodyParser from 'body-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import appConfig from './config/app.config.js'

let isDev = process.env.NODE_ENV !== 'production'
let port = appConfig.port
let PORT = process.env.PORT || port
const app = express()

//connect MongoDB
mongoose.connect(appConfig.database)
mongoose.connection.on('error',() => {
	console.info('Error:Could not connect to MongoDB')
})

//distinguish env
if(isDev){
	console.log('The app is Dev')
}else{
	console.log('The app is Production')
}

/**
 * middleware
 */
//compress middleware
app.use(compression())
//log middleware
app.use(logger('dev'))
//parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//static resource middleware
app.use(express.static(path.join(__dirname,'build'),{index:'index.html'}))

//process route
require('./config/routes')(app)

app.listen(PORT,'127.0.0.1',() => {
	console.log('The app(production) is run at http://localhost:' + PORT)
})
