module.exports = {
	database:process.env.MONGO_URI || 'mongodb://localhost/rs',
	port:9999,
	portDev:9000,
}