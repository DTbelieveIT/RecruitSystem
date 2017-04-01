var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry:{
    server:path.resolve(__dirname,'../server.js')
  },
  output:{
    filename:'[name].build.js'
  },
  devtool:'eval',
  target:'node',
  externals: [nodeExternals()],
  node:{
    __filename:false,
    __dirname:false
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:[path.resolve(__dirname,'node_modules')],
        use:{
          loader:'babel-loader',
          options:{
            presets:['es2015']
          }
        }
      }
    ]
  }
}
