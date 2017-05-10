var express = require('express')
var path = require('path')
var fs = require('fs')
var bodyParser = require('body-parser')
var logger = require('morgan')
var mongoose = require('mongoose')
var upload = require('jquery-file-upload-middleware')
var http = require('http')
var session = require('express-session');
var redis = require('redis')
var RedisStore = require('connect-redis')(session);
var appConfig = require('../../config/app.config.js')

//connect MongoDB
mongoose.connect(appConfig.mongodb.database)
mongoose.connection.on('error',() => {
	console.info('Error:Could not connect to MongoDB')
})

//create redis client
var redisClient = redis.createClient(appConfig.redis.port,appConfig.host)

var isDev = process.env.NODE_ENV !== 'production'
var portDev = appConfig.portDev
var sessionMiddle = session({
	secret: appConfig.session.cookieSecret,
	store:new RedisStore({
		client:redisClient
	}),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }	
})
var app = express()
upload.configure(appConfig.upload.file);

//socket.io
var server = http.createServer(app)
var io = require('socket.io')(server)
io.use(function(socket, next) {
    sessionMiddle(socket.request, socket.request.res, next);
});

//socket router
var router = require('./route/index')

fs.readdir(`${__dirname}/route`,(err,result) => {
	for(var file of result){
		if(file !== 'index.js'){
			var routers = require(`./route/${file}`)
			for(var routePath in routers){
				if(Object.hasOwnProperty.call(routers,routePath)){
					router[routePath] = routers[routePath]
					// router[routePath] = promise.coroutine(routers[routePath])
				}
			}
		}
	}
})

//socket handle
io.on('connection', function (socket) {
	console.log('socket: (' + socket.id + ') 已连接')

	socket.on('message', function (data,cb) {
		router.handle(io,socket,data,cb)
	});

	socket.on('disconnect',function(){
		console.log('socket: (' + socket.id + ') 已断开')
	})

});

//Chat
// var message = require('./controllers/message')
// io.on('connection', function (socket) {
// 	console.log('socket已连接')

// 	socket.on('new message', function (data) {
// 		let newMessage
// 		message.saveMessage(data.meId,data.linkmanId,data.content).then((newMessage) => {
// 			socket.broadcast.emit('new message',newMessage)
// 		})
// 	});

// 	socket.on('disconnect',function(){
// 		console.log('socket已断开')
// 	})

// });

/**
 * express middleware
 */
//log middleware
app.use(logger('dev'))
//file upload middleware
app.use('/file/upload', upload.fileHandler())
//parse application/json middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'../../public')))
//session middleware
app.use(sessionMiddle)

//express process route
require('../../config/routes')(app)


//distinguish env
if(isDev){
	console.log('The app is Dev')
	server.listen(portDev,appConfig.host,() => {
		console.log('The app(dev) is run at http://localhost:' + portDev)
	})
}else{
	console.log('The app is Production')
	//static resource middleware
	app.use(express.static(path.join(__dirname,'build'),{index:'index.html'}))

	server.listen(port,appConfig.host,() => {
		console.log('The app(production) is run at http://localhost:' + port)
	})
}

