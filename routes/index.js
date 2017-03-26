module.exports = function(app){
	app.get('/',function(req,res){
		res.render('index');
	});
	
	require('./register')(app);
	require('./login')(app);
	require('./home')(app);
	require('./screen')(app);
	require('./details')(app);
	require('./cart')(app);
	require('./order')(app);
	require('./404')(app);
	require('./logout')(app);
	
	
	app.get('*',function(req,res){
		res.send('404 - 未找到！');
	});
};

