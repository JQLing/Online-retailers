$(function () {
	var bgSta = ''; // 商品是否被选中
	var shopChecked = []; // 被选中商品
	var shopAllChec = [];  // 被全选商品
	var shopnameChec = []; //被选商品店铺
	var shopnameList = []; // 被选商品店铺下商品件数
	var aIndex = []; // 存放被选商品店铺的下标

	//	全选
	var allChecked = $('.cart_all_checkbox label');
	var shopName = $('.shop_checkbox label');
	var checked = $('.cart_goods_item label');

	//选中全选
	allChecked.click(function () {
		bgSta = $(this).css('background-position');
		if (bgSta == '0px 0px') {
			allChecked.css('background-position', '0 -20px');
			shopName.css('background-position', '0 -20px');
			checked.css('background-position', '0 -20px');
			bgSta = $(this).css('background-position');
			checked.each(function(){
				shopAllChec.push($(this));
			});
			allShopSum(shopAllChec);
			GetCount();
			$('.sum_balance').css('background-color','#ff4400');
		} else {
			allChecked.css('background-position', '0 0');
			shopName.css('background-position', '0 0');
			checked.css('background-position', '0 0');
			bgSta = $(this).css('background-position');
			shopAllChec = [];
			allShopSum(shopAllChec);
			GetCount();
			$('.sum_balance').css('background-color','#b0b0b0');
		}
	});
	//选中店铺名字，全选店铺所有的商品
	shopName.click(function () {
		var index = shopName.index($(this));
		var numIndex = 0;
		var numSum = 0;
		var aThat = $(this).parents('.shop_checkbox').siblings('.cart_goods_list').find('label');
		
		
		bgSta = $(this).css('background-position');
		if (bgSta == '0px 0px') {
			$(this).css('background-position', '0 -20px');
			$(this).parent().parent().siblings('ul').find('label').css('background-position', '0 -20px');
			bgSta = $(this).css('background-position');
			
			aIndex.push(index);   //存放选中店铺下标
			shopnameList.push(aThat.length);   // 存放选中店铺的商品件数
			
			for(var i=0;i<aThat.length;i++){
				shopnameChec.push(aThat[i]);
			}
			shopSum(aThat,shopnameChec);
			GetCount();
			$('.sum_balance').css('background-color','#ff4400');
		} else {
			$(this).css('background-position', '0 0');
			$(this).parent().parent().siblings('ul').find('label').css('background-position', '0 0');
			bgSta = $(this).css('background-position');
			for(var i=0;i<aIndex.length;i++){
				if(aIndex[i] == index){
					numIndex = i;alert(numIndex);
				}
			}
			for(var j=0;j<numIndex;j++){
				numSum+=shopnameList[j];
			}
			
			shopnameChec.splice(numSum,aThat.length);
			aIndex.splice(numIndex,1);
			shopnameList.splice(numIndex,1);
			
			shopSum(aThat,shopnameChec);
			GetCount();
		}
	});
	//选中商品名字
	checked.click(function () {
		var that = $(this);
		bgSta = $(this).css('background-position');
		if (bgSta == '0px 0px') {
			$(this).css('background-position', '0 -20px');
			bgSta = $(this).css('background-position');
			shopChecked.push($(this));    // 选中的商品添加到数组中
			shopSum(that,shopChecked);   
			GetCount();
			$('.sum_balance').css('background-color','#ff4400');
		} else {
			$(this).css('background-position', '0 0');
			bgSta = $(this).css('background-position');
			for(var i=0;i<shopChecked.length;i++){
				if(shopChecked[i].css('background-position')=='0px 0px'){
					shopChecked.splice(i,1);    // 取消的商品从选中的商品中删除
				}
			}
			shopSum(that,shopChecked);
			GetCount();
		}
	});
	//	未选中时，商品 +-
	$('.item_amount a').click(function () {
		var state = $(this).parents('.cart_goods_item').find('label').css('background-position');
		if (state == '' || state == '0px 0px') {
			var idName = $(this).attr('id');
			var num = parseInt($(this).siblings('input').val());
			var lumpSum = 0;

			if (idName == 'increase') {
				num += 1;
			} else if (idName == 'decrease') {
				if (num > 1) {
					num -= 1;
				}
			} else {
				return false;
			}

			lumpSum = parseInt($(this).parent().siblings('.cart_shop_price').find('span').text())*num;
			$(this).parent().siblings('.cart_shop_sum').find('span').html(lumpSum + '.00');
			$(this).siblings('input').val(num);
		}
	});
	
	var sum = 0;
	// 单选/多选 商品总价格
	function shopSum(that,shopChecked) {
		var shopSum = []; // 选中每种商品的总价
		sum =0;
		
			// 选中的商品价格 放入 商品价格数组中
			for (var i = 0; i < shopChecked.length; i++) {
				var price = parseInt($(shopChecked[i]).parent().siblings('.cart_good_details').find('.cart_shop_price span').text());
//				alert(price);
				var shopNum = parseInt($(shopChecked[i]).parent().siblings('.cart_good_details').find('.item_amount .text_amount').val());
//				alert(shopNum);
				shopSum[i] = price * shopNum;
				$(shopChecked[i]).parent().siblings('.cart_good_details').find('.cart_shop_sum span').html(shopSum[i] + '.00');
			}
			// 合计
			for (var j = 0; j < shopSum.length; j++) {
				sum += shopSum[j];
			}
			$('.sum_num').html(sum + '.00');
			// 选中商品后，商品的 +-
			var aAdjust = that.parent().siblings('.cart_good_details').find('.item_amount a'); 
			aAdjust.click(function () {
				if(bgSta == '0px -20px'){
					var idName = $(this).attr('id');
					var num = parseInt($(this).siblings('input').val());
					sum =0;

					if (idName == 'increase') {
						num += 1;
					} else if (idName == 'decrease') {
						if (num > 1) {
							num -= 1;
						}
					} else {
						return false;
					}
					$(this).siblings('input').val(num);

					for (var i = 0; i < shopChecked.length; i++) {
						var price = parseInt($(shopChecked[i]).parent().siblings('.cart_good_details').find('.cart_shop_price span').text());
		//				alert(price);
						var shopNum = parseInt($(shopChecked[i]).parent().siblings('.cart_good_details').find('.item_amount .text_amount').val());
		//				alert(shopNum);
						shopSum[i] = price * shopNum;
						$(shopChecked[i]).parent().siblings('.cart_good_details').find('.cart_shop_sum span').html(shopSum[i] + '.00');
					}
					for (var j = 0; j < shopSum.length; j++) {
						sum += shopSum[j];
					}
					$('.sum_num').html(sum + '.00');
				}
				
			});
		if(sum == 0){
			$('.sum_balance').css('background-color','#b0b0b0');
		}
	}
	//选中商品店铺名 商品总价格
	function shopnameSum(that,shopCheked){
	}
	// 全选选中商品总价格
	function allShopSum(shopAllChec) {
		sum = 0;
		var shopSum = []; // 选中每种商品的总价
		
		if (bgSta == '0px -20px') {
			// 计算选中商品价格
			for (var i = 0; i < shopAllChec.length; i++) {
				var price = parseInt($(shopAllChec[i]).parent().siblings('.cart_good_details').find('.cart_shop_price span').text());
//				alert(price);
				var shopNum = parseInt($(shopAllChec[i]).parent().siblings('.cart_good_details').find('.item_amount .text_amount').val());
//				alert(shopNum);
				shopSum[i] = price * shopNum;
				$(shopAllChec[i]).parent().siblings('.cart_good_details').find('.cart_shop_sum span').html(shopSum[i] + '.00');
			}
		} else {
			sum = 0;
			$('.sum_num').html('0.00');
		}
		for (var j = 0; j < shopSum.length; j++) {
			sum += shopSum[j];
		}
		$('.sum_num').html(sum + '.00');
	}
	
	// 选中商品的件数
	function GetCount() {
		var goodNum = 0;
		checked.each(function () {
			if ($(this).css('background-position')=='0px -20px') {
				for (var i = 0; i < $(this).length; i++) {
					goodNum += 1;
				}
			}
		});
		$(".has_choose_num").text(goodNum);
	}
	// 	用户结算
	$('.sum_balance_txt').click(function () {
		if (sum) {
			var data = {
				sum: sum
			};
			$.ajax({
				url: '/cart',
				type: 'POST',
				data: data,
				success: function (data, status) {
					location.href = "order";
				},
				error: function (data, status) {
					alert('结算失败');
					location.href = "cart";
				}
			});
		} else {
			return false;
		}



	});
	//	修改商品型号(显示修改)
	(function () {
		var aModel = $('.cart_good_model');
		var aRevise = $('.cart_shop_revise');

		aModel.hover(function(){
			var index = aModel.index($(this));
			aRevise.eq(index).removeClass('hide').addClass('show');
		},function(){
			var index = aModel.index($(this));
			aRevise.eq(index).removeClass('show').addClass('hide');
		});
	})($);
});
