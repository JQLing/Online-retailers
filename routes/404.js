module.exports = function(app){
	app.get('/404',function(req,res){
		res.render('404');
	});
}