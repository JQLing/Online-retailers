module.exports= function(app){
	//查看购物车商品
	app.get('/cart',function(req,res){	
		var Cart = global.dbHelper.getModel('cart');
		if(!req.session.user){
            req.session.error = '请登录';
            res.redirect('/login');
        }else{
			
			Cart.find({'uId':req.session.user._id,'status':false}, function (error, docs) {
				if(docs){
					res.render('cart',{carts: docs});
					
				}else{
				}
                
				
            });
		}
	});	
	app.post('/cart',function(req,res){
		req.session.goodNum = req.body.goodNum;
		req.session.sum = req.body.sum;
		res.send(200);
	});
	
	//删除购物车商品
	app.get('/delFromCart/:id',function(req,res){
		//req.params.id 获取购物车商品ID号
		var Cart = global.dbHelper.getModel('cart');
		
		Cart.remove({"_id": req.params.id}, function (error, doc) {
			//成功返回1  失败返回0
			if (doc > 0) {
				res.redirect('/cart');
			}
		});
		
	});
		
	/*
	//购物车结算
    app.post("/order",function(req,res){
        var Cart = global.dbHelper.getModel('cart');
		
        Cart.update({"_id":req.body.id},{$set : { quantity : doc.quantity,status:true }},function(error,doc){
            //更新成功返回1  失败返回0
            if(doc > 0){
                res.send(200);
            }
        });
    });	
   */
};
