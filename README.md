# RecruitSystem
## 热更新模块
pm2 nodemon nginx supervisor

## babel-node转码
babel-cli  

## nodemon
nodemon -x babel-node server.js

## supervisor
supervisor -w . -x babel-node -e node,js,html server.js

## 生产环境下两个命令窗口
1. npm run build: webpack监听打包
2. set NODE_ENV=production&&npm start: nodemon监听node端文件更新

## 开发环境下两个命令行窗口
1. set NODE_ENV=dev&&npm start: 开启webpack-dev-server监听打包，转发前端请求到node服务器
2. set NODE_ENV=dev&&npm run server: nodemon接收并处理转发的请求

# 问题
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
3. Mongoose update时遇到的问题，主要是Mongoose与Mongo更新文档的差异
```js
let result = await Msg.update({to:meId,readed:false},{$set:{readed:true}},{multi:true})
//mongoose update报错
let result = await Msg.update({to:meId,readed:false},{$set:{readed:true}},false,true)

//mongo update正确
db.getCollection('msgs').update({to:ObjectId("590ffd773586461fb469c86b"),readed:true},{$set:{readed:false}},false,true)

```
4. less文件打包
```js
{
    test: /\.less$/,
     use: extractLess.extract({
         fallback: 'style-loader',
         use: ['css-loader', 'less-loader']
     })
 },

VS

{ test: /\.less/, use: ["style-loader", "css-loader", "less-loader"]},
```
