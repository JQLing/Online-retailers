$(function(){
//	选择送货地址
	(function(){})();
// 商品图片局部放大	
	(function(){
		var aTabList = $('.tb_thumb li');
		var aShowBigPic = $('.show_bigger_pic');
		var aShopPic = $('.small_pic_div');
		var aCover = $('.cover');
		var aMove = $('.float_span');
		var aDetailPic = $('.big_pic_div');
		var aPic = $('.big_pic_div img');
		
		aTabList.mouseover(function(){
			var index = $(this).index();
			aShowBigPic.eq(index).removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide');
		});
		aCover.mouseover(function(){
			var num = aCover.index($(this));
			aShowBigPic.css('width',856);
			aMove.eq(num).css('display','block');
			aDetailPic.eq(num).removeClass('hide').addClass('show');
			$(this).css('cursor','move');
		});
		aCover.mouseout(function(){
			var num = aCover.index($(this));
			aMove.eq(num).css('display','none');
			aDetailPic.eq(num).removeClass('show').addClass('hide');
			aShowBigPic.css('width',418);
		});
		aCover.mousemove(function(e){
			var index = aCover.index($(this));
			var l = e.pageX-aShopPic.eq(index).offset().left-aMove.eq(index).outerWidth()/2;
			var t = e.pageY-aShopPic.eq(index).offset().top-aMove.eq(index).outerHeight()/2;
			
			if(l<0){
				l=0;
			}
			else if(l>$(this).outerWidth()-aMove.eq(index).outerWidth()){
				l=$(this).outerWidth()-aMove.eq(index).outerWidth();
			}
			if(t<0){
				t=0;
			}
			else if(t>$(this).outerHeight()-aMove.eq(index).outerHeight()){
				t=$(this).outerHeight()-aMove.eq(index).outerHeight();
			}
			aMove.eq(index).offset({left:l+170,top:t+260});
			
			var percentX=l/$(this).outerWidth();
			var percentY=t/$(this).outerHeight();
			var lPic = -percentX * (aPic.eq(index).outerWidth());
			var tPic = -percentY * (aPic.eq(index).outerHeight());
			
			aPic.eq(index).offset({left:lPic+598,top:tPic+260}); 
		});
	})();
// 选项卡切换
	(function(){
		var aGood = $('.good_details_item');
		var aContent = $('.details_info');
		
		aGood.click(function(){
		var index = aGood.index($(this));
			$(this).addClass('active').siblings().removeClass('active');
			aContent.eq(index).removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide');
		});
		
		
	})();
		
	(function(){
		// 评论内容排序方式
		var oBtn =$('#selectbtn');
		var oSortSele = $('#tm_select');
		oBtn.click(function(){
			if(oSortSele.css('display') == 'none'){
				oSortSele.css('display','block');
			}else{
				oSortSele.css("display",'none');
			}
		});
	})();
	
//	选择尺码/颜色/数量/立即购买/加入购物车
	(function(){
		var oShopName = $('#shop_name').text();
		var oGoodName = $('#good_title').text();
		var oPrice = $('#price').text();
		var oSize = null;
		var oColor = null;
		var oImgSrc = null;
		var oNum = parseFloat($('#buy_num').val());
		
		var data = {
			shopName: oShopName,
			goodName: oGoodName,
			size: oSize,
			color: oColor,
			imgSrc: oImgSrc,
			price: oPrice,
			num: oNum
		};
		
		var aSize = $('.size_item');
		var aImgSrc = $('.color_item');
		var oBuyNow = $('#buyNow');
		var oShopingCart = $('#shopingCart');
		var flag = 0;
		
		// 选择尺码
		aSize.click(function(){
			var index = aSize.index($(this));
				
			aSize.removeClass('size_active');
			$(this).addClass('size_active');
				
			oSize = $(this).text();
			
			flag = $('#size_box dd').children().hasClass('size_active') & $('#color_box dd').children().hasClass('color_active');
			
		});
		// 选择图片/颜色
		aImgSrc.click(function(){
			var index = aImgSrc.index($(this));
				
			aImgSrc.removeClass('color_active');
			$(this).addClass('color_active');
				
			oImgSrc = $(this).find('img').attr('src');
			oColor = $(this).find('img').attr('alt');		
				
			flag = $('#size_box dd').children().hasClass('size_active') & $('#color_box dd').children().hasClass('color_active');
			
		});
		// 商品数量 增加(减少)
		$('.arrow a').click(function(){
			var idName = $(this).attr('id');
			
			if(idName == 'increase'){
				oNum+=1;
			}else if(idName == 'decrease'){
				if(oNum>1){
					oNum-=1;
				}
			}else{
				return false;
			}
			$('#buy_num').val(oNum)
			oNum=parseFloat($('#buy_num').val());
		});
		
		// 加入购物车
		oShopingCart.click(function(){
			data = {
				shopName: oShopName,
				goodName: oGoodName,
				size: oSize,
				color: oColor,
				imgSrc: oImgSrc,
				price: oPrice,
				num: oNum
			};
			if(flag){
				$.ajax({
					url: '/details',
					type: 'POST',
					data : data,
					success: function(data,status){
						if(status == 'success'){
							alert('添加成功！');
						}
					},
					error: function(data,status){
						alert('添加失败！');
					}
				});
			}
						
		});
		// 立即购买
		oBuyNow.click(function(){
			data = {
				shopName: oShopName,
				goodName: oGoodName,
				size: oSize,
				color: oColor,
				imgSrc: oImgSrc,
				price: oPrice,
				num: oNum
			};
			if(flag){
				$.ajax({
					url: '/details',
					type: 'POST',
					data: data,
					success: function (data, status) {
						if (status == 'success') {
							location.href = './cart';
						}
					},
					error: function (data, status) {
						alert('添加失败！');
					}
				});
			}
			
		});
			
	})();
		

	
});