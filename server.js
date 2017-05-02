import express from 'express'
import path from 'path'
import compression from 'compression'
import bodyParser from 'body-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import appConfig from './config/app.config.js'
import upload from 'jquery-file-upload-middleware'

let isDev = process.env.NODE_ENV !== 'production'
let port = appConfig.port
let portDev = appConfig.portDev

const app = express()
upload.configure(appConfig.upload.img);

//connect MongoDB
mongoose.connect(appConfig.database)
mongoose.connection.on('error',() => {
	console.info('Error:Could not connect to MongoDB')
})


/**
 * middleware
 */
//compress middleware
app.use(compression())
//log middleware
app.use(logger('dev'))
//file upload
app.use('/file/upload', upload.fileHandler())
//parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

//process route
require('./config/routes')(app)

//distinguish env
if(isDev){
	console.log('The app is Dev')
	app.listen(portDev,'127.0.0.1',() => {
		console.log('The app(dev) is run at http://localhost:' + portDev)
	})
}else{
	console.log('The app is Production')
	//static resource middleware
	app.use(express.static(path.join(__dirname,'build'),{index:'index.html'}))

	app.listen(port,'127.0.0.1',() => {
		console.log('The app(production) is run at http://localhost:' + port)
	})
}

