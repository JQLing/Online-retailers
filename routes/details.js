
module.exports = function(app){
	 app.get('/details', function(req, res){
        res.render('details');
     });   
     app.post('/details', function (req, res) {
		if(!req.session.user){
			req.session.error ="请重新登录";
			res.redirect('/login');
		}else{
			var Cart = global.dbHelper.getModel('cart');
			var num = req.body.num * 1;
			var price = req.body.price * 1;
			
			req.session.goodNum = req.body.num;
			req.session.sum = req.body.money;
			
			Cart.findOne({'uId':req.session.user._id,'shopName': req.body.shopName,'goodName':req.body.goodName,'size':req.body.size,'color':req.body.color,'imgSrc': req.body.imgSrc,'price':req.body.price},function(error,doc){//商品已存在 +num(商品数量)
				if(doc){
					
					Cart.update({'uId': req.session.user._id,'shopName': req.body.shopName,'goodName':req.body.goodName,'size':req.body.size,'color':req.body.color,'imgSrc': req.body.imgSrc,'price':req.body.price},
								{$set: {quantity: doc.quantity + num,money: doc.money + num * price
					}},function(error,doc){
						if(doc){
							res.send(200);
							console.log('更新成功：' + doc);
						}else{
							res.send(500);
							console.log('更新失败');
						}
					});
				}else{
					Cart.create({
						uId: req.session.user._id,
						shopName: req.body.shopName,
						goodName: req.body.goodName,
						size: req.body.size,
						color: req.body.color,
						imgSrc: req.body.imgSrc,
						price: req.body.price,
						quantity: req.body.num,
						money: req.body.money
					}, function (error, doc) {
						if (doc) {
							res.send(200);
						}else{
							res.send(404);
						}
					});
				}
			});
			
			
		}
		
    });
	

	
};
