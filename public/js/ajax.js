function ajax(options) {
  //存储默认值
  var defaults = {
    type:'get',
    url:'',
    data:{},
    header:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    success:function (){},
    error:function (){}

  }
  Object.assign(defaults,options)
  //创建Ajax对象
  var xhr = new XMLHttpRequest()
  var params
  for(var attr in defaults.data){
    params +=attr + '=' + defaults.data[attr] + '&'
  }
  params = params.substr(0,params.length-1)
  //配置Ajax对象
  if(defaults.type=='get'){
    xhr.open(defaults.type,defaults.url+'?'+params)
  }else {
    xhr.open(defaults.type,defaults.url)
  }

  //发送请求
  if(defaults.type == 'post'){
    var contentType = defaults.header['Content-Type']
    xhr.setRequestHeader('Content-type',contentType)
    if(contentType == 'application/json'){
      //console.log('使用post请求传递json格式的参数')
      xhr.send(JSON.stringify(defaults.data))
    }else{
      xhr.send(params)
    }

  }else{
    xhr.send()
  }

  //监听onload事件
  xhr.onload = function () {
    //xhr.getResponseHeader()
    var strType = xhr.getResponseHeader('Content-Type')
   // console.log(strType)
    var responseText = xhr.responseText
    if(strType.includes('application/json')){
      responseText = JSON.parse(responseText)

    }
    if(xhr.status == 200){
      defaults.success(responseText,xhr)
    }else{
      defaults.error(responseText,xhr)
    }

  }
}