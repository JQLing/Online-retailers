
module.exports = function(app){
	 app.get('/details', function(req, res) {
        res.render('details');
    });
    app.post('/details', function (req, res) {
		if(!req.session.user){
			req.session.error ="请重新登录";
			res.redirect('/login');
			
		}else{
			var Commodity = global.dbHelper.getModel('commodity');
			var Cart = global.dbHelper.getModel('cart');
			var creatComm = 0;
			var creatCart = 0;
			var flag = creatComm & creatCart;
			
			Commodity.create({
				shopName: req.body.shopName,
				goodName: req.body.goodName,
				size: req.body.size,
				color: req.body.color,
				imgSrc: req.body.imgSrc,
				price: req.body.price,
				num: req.body.num
			}, function (error, doc) {
				if (doc) {
					creatComm = 1; 
				}else{
					res.send(404);
				}
			});
			Cart.create({
				uId: req.session.user._id,
				cId: req.session.commodity._id,
				cName: req.body.goodName,
				cShopName: req.body.shopName,
				cSize: req.body.size,
				cColor: req.body.color,
				cImgSrc: req.body.imgSrc,
				cPrice: req.body.price,
				cQuantity: req.body.num 
			},function(error, doc){
				if (doc) {
					creatCart = 1;
					flag = creatComm & creatCart; 
					if(flag){
						res.send(200);
					}else{
						res.send(404);
					}
				}else{
					res.send(404);
				}
			});
		}
		
    });
};
