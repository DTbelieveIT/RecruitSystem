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
npm run start: webpack监听打包
set NODE_ENV=production&&nodemon -x babel-node server.js: nodemon监听node端文件更新