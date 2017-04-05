module.exports= function(app){
	app.get('/order',function(req,res){
		if(req.session.user){
			res.render('order',{goodNum:req.session.goodNum,sum:req.session.sum});
		}else{
			res.redirect('/login');
		}
		
	});
};