/*var obj1 = {
  name:'djh',
  age:20
}
var str1 = JSON.stringify(obj1)
str1 = str1.substr(1,str1.length-2)
console.log(str1)
console.log(typeof str1)*/
const  fs = require('fs')
var userStr = '"username":djh,"password":445566'

fs.readFile('./user.txt',(err,data)=> {
  if (!err) {
    var allUser = data.toString()
    if (allUser.includes(userStr)) {
      console.log('登陆成功')
    } else {
      console.log('账号或密码有误')
    }
  } else {
    console.log(err)
  }
})