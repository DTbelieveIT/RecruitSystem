module.exports = {
	rootAccount:{
		account:'root',
		password:'root',
		role:2,
		phone:'12345678910',
		name:'DTBelieveIT',
	},
	server:'localhost',
	serverDev:'localhost',
	host:'127.0.0.1',
	port: 9999,
	portDev: 9000,
	//图片上传配置
	upload: {
		file: {
			uploadDir: __dirname+'/../public/uploads',
			uploadUrl: '/uploads',
			imageVersions: {
				thumbnail: {
					width: 80,
					height: 80
				}
			}
		}
	},
	redis:{
		port:6379,
	},
	mongodb:{
		database: process.env.MONGO_URI || 'mongodb://localhost/rs',
	},
	session:{
		cookieSecret:'secret'
	},
	//生成Token的密钥
	jwtSecret:'gdt',
}