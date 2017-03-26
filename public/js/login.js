$(function(){
	
		var oLoginBtn=$('#login_btn');
		var data = '';
		
		oLoginBtn.on('click',function(){
			data = $(".login_form").serialize();
			$.ajax({
				url: '/login',
				type: 'POST',
				data: data,
				success: function(data,status){
					if(status == 'success'){
						location.href = './home';
					}
				},
				error:function(data,status){
					if(status == 'error'){
						location.href='./login';
					}
				}
			});
		});
	
});