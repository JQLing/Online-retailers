module.exports= function(app){
	app.get('/cart',function(req,res){
		var Commodity = global.dbHelper.getModel('commodity');
		var Cart = global.dbHelper.getModel('cart');
		
		
        if(!req.session.user){
            req.session.error = "请重新登录"
            res.redirect('/login');
        }else{
			//查看购物车商品
            Cart.find({"uId":req.session.user._id,"cStatus":false}, function (error, docs) {
                res.render('cart',{carts:docs});
            });
			
			
		//req.params.id 获取商品ID号
		Cart.findOne({"uId":req.session.user._id, "cId":req.params.id},function(error,doc){
               //商品已存在 +1
                if(doc){
                    Cart.update({"uId":req.session.user._id, "cId":req.params.id},{$set : { cQuantity : doc.cQuantity + 1 }},function(error,doc){
                        //成功返回1  失败返回0
                        if(doc > 0){
                            res.redirect('/details');
                        }
                    });
                //商品未存在，添加
                }else{
                    Commodity.findOne({"_id": req.params.id}, function (error, doc) {
                        if (doc) {
                            Cart.create({
                                uId: req.session.user._id,
                                cId: req.params.id,
                                cName: doc.goodName,
                                cShopName: doc.shopName,
                                cSize: doc.size,
                                cColor: doc.color,
                                cImgSrc: doc.imgSrc,
                                cPrice: doc.price,
                                cQuantity : doc.num
                            },function(error,doc){
                                if(doc){
                                    res.redirect('/details');
                                }
                            });
                        } else {

                        }
                    });
                }
            });
			
			
/*			
			//添加购物车商品
			Cart.update({"uId":req.session.user._id, "cId":req.params.id},{$set : { cQuantity : doc.cQuantity + 1 }},function(error,doc){
                        //成功返回1  失败返回0
                        if(doc > 0){
                            res.redirect('/home');
                        }
                    });
			
			//删除购物车商品
			Cart.remove({"_id":req.params.id},function(error,doc){
            	//成功返回1  失败返回0
            	if(doc > 0){
					res.redirect('/cart');
            	}
        	});
			
			//购物车结算
			Cart.update({"_id":req.body.cId},{$set : { cQuantity : req.body.cnum,cStatus:true }},function(error,doc){
            	//更新成功返回1  失败返回0
            	if(doc > 0){
                	res.send(200);
            	}
        	});
		
*/		
			
			
        }
	});
};