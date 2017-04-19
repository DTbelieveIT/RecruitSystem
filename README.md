#RecruitSystem
set NODE_ENV=production&&npm start

##热更新模块
pm2 nodemon nginx supervisor

##babel-node转码
babel-cli  

##nodemon
nodemon -x babel-node server.js

##supervisor
supervisor -w . -x babel-node -e node,js,html server.js

##开发时两个命令窗口
npm run build: webpack监听打包
set NODE_ENV=production&&nodemon -x babel-node server.js: nodemon监听node端文件更新


#问题
1. css模块化打包，下面组合报错
```js
var extractLess = new extractTextplugin({filename:'style/[name]-[contenthash].less.css',allChunks:true});//所有css chunk打包到一个文件中

      {
        test:/\.less$/,
        use:extractLess.extract(['css-loader?modules', 'less-loader'])
      }

```
2. 使用环境
```js
var CleanWebpackPlugin = require('clean-webpack-plugin');
    new CleanWebpackPlugin(['build'], {
      root: '../',
      verbose: true,
      dry: false
    })
```
