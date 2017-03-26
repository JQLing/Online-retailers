module.exports= function(app){
	app.get('/login',function(req,res){
		res.render('login');
	});
	app.post('/login',function(req,res){
		var User = global.dbHelper.getModel('user');
		var uname = req.body.username;
		var upassword = req.body.password;
		
		User.findOne({name: uname},function(err,doc){
//			用户名不存在
			if(!doc){
				req.session.error = '用户名不存在！';
				res.send(404);
//				用户名存在但密码错误
			}else if(upassword!=doc.password){
				req.session.error = "密码错误！";
				res.send(404);
			}else{
				req.session.user = doc;
				res.send(200);
			}
			
				
		});
	})
};