module.exports= function(app){
	app.get('/screen',function(req,res){
		res.render('screen');
	});
};