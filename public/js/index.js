$(function(){
	(function(){
		//    关闭头部活动条
        var oActive=$('#top_active');
        var oBtn=$('header #btn');
        
        oBtn.click(function(){
            oActive.css('display','none');
            oBtn.css('display','none');
        });
		//    商品列表弹出
		var aLi=$('#shopClass_show li');
		var aShopList = $('.shopClass_list');
		
		aLi.hover(function(){
			var index = aLi.index($(this));
			$(this).css('background','#f0534e');
			aShopList.eq(index).removeClass('hide').addClass('show');
		},function(){
			var index = aLi.index($(this));
			var self = $(this);
			aShopList.eq(index).hover(function(){
				aLi.eq(index).css('background','#f0534e');
				aShopList.eq(index).removeClass('hide').addClass('show');
			},function(){
				self.css('background','#6e6568');
				aShopList.eq(index).removeClass('show').addClass('hide');
			});
				self.css('background','#6e6568');
				aShopList.eq(index).removeClass('show').addClass('hide');
		});
    })();
//    轮播图
    (function(){
        var oCarousel = $('#carousel');
        var oUl = $('#slider');
        var aNum = oCarousel.find('.page_item');
        var width = oUl.find('li').eq(0).width();
        
        var timer = null;
        var iNow = 0;
		
		aNum.hover(function(){
			var index = aNum.index($(this));
			iNow = index;
			
			$(this).addClass('active').siblings().removeClass('active');
				oUl.animate({
					left: - width * iNow
				});
			clearInterval(timer);
		},function(){
			timer = setInterval(function(){
            	iNow++;
            	if(iNow>aNum.length-1){
                	iNow = 0;  
            	}
				aNum.eq(iNow).addClass('active').siblings().removeClass('active');
				oUl.animate({
					left: - width * iNow
				});
        	},3000);
		});
		timer = setInterval(function(){
            iNow++;
            if(iNow>aNum.length-1){
                iNow = 0;  
            }
			aNum.eq(iNow).addClass('active').siblings().removeClass('active');
			oUl.animate({
				left: - width * iNow
			});
        },3000);
        
       
    })();
//    用户面板
	(function(){
        var aTitle = $('.title_list');
        var aNew = $('.new');
        
        aTitle.each(function(index){
            $(this).on('mouseover',function(){
                $(this).addClass('active').siblings().removeClass('active');
				aNew.eq(index).css('display','block').siblings().css('display','none');
            });
        });
    })();
	
//    活动专区
    (function(){
        var aTb = $('.tb_item');
        var aTitle = $('.tb_title');
        var aPic = $('.floor_list_bottom .pic');
        var aPTit = $('.pic_more .title');
      
		function suspend(obj1,obj2) {
			obj1.each(function(index){
				$(this).on('mouseover',function(){
					obj2.eq(index).css('color','#f40');
				});
				$(this).on('mouseout',function(){
					obj2.eq(index).css('color','#737373');
				});
			});
		}
		suspend(aTb,aTitle);
		suspend(aPic,aPTit);
		
    })();
});