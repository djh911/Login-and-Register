$(function() {
	var $register = $('.register')
	var $login = $('.login')
	var $loginNow = $('#log1')
	var $ris1 = $('#ris1')
	var $ris2 = $('#ris2')

	var $loginUsername = $('#username1')
	var $loginPassword = $('#password1')
	var $registerUsername = $('#username2')
  var $registerPassword1 = $('#password2')
  var $registerPassword2 = $('#password3')

	$loginNow.click (function () {
		var username = $loginUsername.val()
		var password = $loginPassword.val()
		var user = {
			username,
			password
		}
		console.log(user)
		ajax(
			{
				type:'post',
				url:'http://localhost:5000/login',
				data:user,
        header:{
          'Content-Type':'application/json'
        },
        success:(responseText,xhr)=>{
					alert(username + '欢迎您')
				},
        error:function (responseText,xhr){
        	console.log('失败')
				}
			}
		)

  })


	$ris1.click(function() {
		$login.css({
			display: "none"
		})
		$register.css({
			display: "block"
		})
	})
	$ris2.click(function() {
    var username = $registerUsername.val()
    var password = $registerPassword1.val()
    var password2 = $registerPassword2.val()
		if(password==password2){
    	var user = {
      username,
      password
    	}
      ajax(
        {
          type:'post',
          url:'http://localhost:5000/register',
          data:user,
          header:{
            'Content-Type':'application/json'
          },
          success:(responseText,xhr)=>{
          	console.log(responseText)
						if(responseText=='注册成功'){
              alert(username + '注册成功')
              //隐藏注册界面，显示登录界面
              $login.css({
                display: "block"
              })
              $register.css({
                display: "none"
              })
              //修改登录界面
              $loginUsername.val(user.username)
							$loginPassword.val(user.password)
						}else{
							alert(username + '已经被注册')
						}

          },
          error:function (responseText,xhr){
            console.log('注册失败')
          }
        }
      )
    }else{
			alert('密码不一致')
		}



	})
})
