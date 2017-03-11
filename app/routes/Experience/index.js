module.exports = {
	path:'experience',
	getComponent(nextState,cb){
		require.ensure([],(require) => {
			cb(null,require('./components/Experience.js'))
		})
	}
}