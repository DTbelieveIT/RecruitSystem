module.exports = {
	database: process.env.MONGO_URI || 'mongodb://localhost/rs',
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
	}
}