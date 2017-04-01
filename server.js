import express from 'express'
import path from 'path'
import compression from 'compression'
import logger from 'morgan'
import mongoose from 'mongoose'
import dbconfig from './config/db.config.js'

//controllers
import User from './controllers/user'

//connect MongoDB
mongoose.connect(dbconfig.database)
mongoose.connection.on('error',() => {
	console.info('Error:Could not connect to MongoDB')
})

const app = express()

/**
 * middleware
 */
//compress middleware
app.use(compression())
//log middleware
app.use(logger('dev'))
//static resource middleware
app.use(express.static(path.join(__dirname,'build'),{index:'index.html'}))


//process request
app.get('/api/logon',User.signup)

let PORT = process.env.PORT || 9999
app.listen(PORT,'127.0.0.1',() => {
	console.log('The app is run at http://localhost:' + PORT)
})