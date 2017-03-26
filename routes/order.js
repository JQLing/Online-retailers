module.exports= function(app){
	app.post('/order',function(req,res){
		res.render('order',{sum:req.body.sum});
	});
};