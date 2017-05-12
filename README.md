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
5. mongoose 不能直接使用$match匹配_id的解决
问题定位：This is exactly what I answered with. A .find() can use the Schema which of course has a default type of ObjectId for the _id field. Aggregation pipelines do not use the Schema
问题解决：
http://www.cnblogs.com/neverstop/p/4581388.html
http://stackoverflow.com/questions/36193289/moongoose-aggregate-match-does-not-match-ids
https://github.com/Automattic/mongoose/issues/1399
```js
var Message = require('./models/message')
var mongoose = require('mongoose')
async function test(userid){
  let linkmans = await Message.aggregate([{$match:{to:userid}},{$group:{_id:{from:"$from",to:"$to"},number:{$sum:1}}}]) //doesn't work
  let linkmans = await Message.aggregate([{$match:{content:'hi'}},{$group:{_id:{from:"$from",to:"$to"},number:{$sum:1}}}]) //work
  let linkmans = await Message.aggregate([{$match:{"to":new mongoose.Types.ObjectId(userid)}},{$group:{"_id":{"from":"$from","to":"$to"},"number":{$sum:1}}}]) //work
  console.log(linkmans)
}
test('590ffdc43586461fb469c86f')
```
6. react es6组件写法总结
react组件的值越级传递
http://blog.csdn.net/liwusen/article/details/53408906
```js
//1 在组件内部的使用static
static defaultProps = {
    name:　...
}
static propTypes = {
    name: PropTypes.string.isRequired
};
static contextTypes = {
    router: React.PropTypes.object.isRequired,
}

//2 在组件外部
Hello.defaultProps = {
    name: ...
}

Hello.PropTypes = {
    name: PropTypes.string.isRequired
}

Hello.contextTypes = {
  name: React.PropTypes.string
};
```
7. ObjectId类型和String类型严格相等为false
```js
  let existed = info.person.some((item) => {
    //需要将ObjectId toString化才能与字符串进行比较
    if(item.user.toString() === userId){
      return true
    }
    return false
  })
```