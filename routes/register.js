var multer = require('multer');

module.exports = function(app){
	app.get('/register',function(req,res){
		res.render('register');
	});
	app.post('/register',function(req,res){
		var User = global.dbHelper.getModel('user');
		var uname = req.body.username;
		
		User.findOne({name: uname},function(error,doc){
			if(doc){
				req.session.error = '用户名已存在！ ';
				res.send(500);
			}else{
				User.create({
					name: uname,
					password: req.body.password,
					enterPassword: req.body.enter_password
				},function(error,doc){
					if(error){
						res.send(500);
						console.log(error);
					}else{
						req.session.error = '用户名创建成功！ ';
						res.send(200);
					}
				});
			}
		});
			
	});

}