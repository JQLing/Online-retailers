$(function(){
//	单击注册按钮
	
		var oRegisterBtn = $('#register_submit');
		var data = '';
		
		oRegisterBtn.on('click',function(){
			//通过serialize()方法进行序列化表单值，创建文本字符串。
			data = $('.register_form').serialize();
			
			$.ajax({
				url: '/register',
				type: 'POST',
				data: data,
				success: function(data,status){
					if(status == 'success'){
					//当注册成功时就可以跳转到登陆页面了
						location.href='./login';
					}
				},
				error: function(res,err){
					location.href='./register';
				}
			});
		});
	

});