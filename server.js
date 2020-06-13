//引入express库
const express = require('express')
//引入path库
const path = require('path')
//引入文件读写模块
const  fs = require('fs')
//引入body-parser模块
const bodyparser = require('body-parser')
//创建服务器
const server = new express()
//静态资源访问
server.use(express.static(path.join(__dirname,'Public')))
//设置访问带参类型
server.use(bodyparser.urlencoded())
server.use(bodyparser.json())
//配置路由
//1.登录
server.post('/login',(req,res)=>{
  var result = req.body
  var str = JSON.stringify(result)
  var userStr = str.substr(1,str.length-2)
  fs.readFile('./user.txt',(err,data)=>{
    if(!err){
      var allUser = data.toString()
      if(allUser.includes(userStr)){
        res.send(result)
      }else{
        res.send('账号或密码有误')
      }
    }else{
      console.log(err)
    }
  })

})

server.post('/register',(req,res)=>{
  var result = req.body
  var str = JSON.stringify(result)
  var userStr = str.substr(1,str.length-2)
  var name = result.username
  fs.readFile('./user.txt',(err,data)=>{
    if(!err){
      var allUser = data.toString()
      if(allUser.includes(name)){
        res.send('账号已被注册')
      }else{
        fs.writeFile('./user.txt',userStr,{flag:'a'},err=>{
          if(!err){
            console.log('success')
            res.send('注册成功')
          }else{
            console.log(err)
          }
        })
      }
    }else{
      console.log(err)
    }
  })

})
//监听端口5000
server.listen(5000)
//控制台提示输出
console.log('服务器启动成功')