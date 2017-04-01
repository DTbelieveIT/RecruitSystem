var webpack = require('webpack');
var path = require('path');
var webpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')
var extractTextplugin = require('extract-text-webpack-plugin');
var extractCss = new extractTextplugin('style/[name]-[contenthash].css');
var extractLess = new extractTextplugin('style/[name]-[contenthash].less.css');
var node_modules = path.resolve(__dirname, '../node_modules');

module.exports = {
  entry:{
    main:path.resolve(__dirname,'../app/index.js'),
    vendor:['react','react-dom'],
  },
  output:{
    path:path.resolve(__dirname,'../build'),
    filename:'bundle.js'
  },
  devtool:'eval',
  target:'web',
  module:{
    rules:[
      {
        test:/\.css$/,
        use:extractCss.extract({
          fallback:'style-loader',
          use:{
            loader:'css-loader',
            options:{
              modules:true,
              devtool:'source-map'
            }
          }
        })
      },
      {
        test:/\.less$/,
        use:extractLess.extract({
          fallback:'style-loader',
          use:['css-loader?modules','less-loader']
        })
      },
      {
        test:/\.js$/,
        exclude:[path.resolve(__dirname,'../node_modules')],
        use:{
          loader:'babel-loader',
          options:{
            presets:['es2015','react']
          }
        }
      }
    ]
  },
  devServer:{
    compress:true,
    port:9999,
    host:'0.0.0.0',
    hot:true,
    historyApiFallback:true
  },
  resolve:{
    alias:{
      'react':path.resolve(node_modules,'react/dist/react.min.js'),
      'react-dom':path.resolve(node_modules,'react-dom/dist/react-dom.min.js')
    },
    extensions:['.js','.json']
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      filename:'vendor.js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    extractCss,
    extractLess,
    new webpackMd5Hash(),
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:path.resolve(__dirname,'../public/index.html'),
    }),
    new FaviconsWebpackPlugin(path.resolve(__dirname,'../public/favicon.png'))
  ]
}
