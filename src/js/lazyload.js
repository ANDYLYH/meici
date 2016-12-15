$(function(){
	      //吸顶菜单
				$(document).scroll(function(){
					var scrolltop = $(this).scrollTop();
					if(scrolltop >= 200){ //设定一个高度
						$(".float_logo").show();
					}else{
						$(".float_logo").hide();
					}
				})
	      //页面顶部
					$('.goods_head').load('header.html .hh',function(){
				//导航栏
				var $olist =$(".main_nav .main_nav_bd .nav_list");
				var $oli = $olist.children();
				//二级导航栏
				$.each($oli, function(idx,ele){
					$(this).on("mouseenter",function(){
						$(this).addClass("active").children("div").show();
						$(this).children("a").css({"color":"#FFFFFF","background":"#8e0c3a"});
					}).on("mouseleave",function(){
						$(this).removeClass("active").children("div").hide();
						$(this).children("a").css({"color":"#333333","background":"#FFFFFF"});
					})
				});
				
				//获取cookie 将物品数量显示在头部的购物车上
				 if(getCookie("goods_states")){
						$("#cuont_goods").html(JSON.parse(getCookie("goods_states")).length);
						}
					//购物车
	
					var $car_l = $(".right_3");
					
					$car_l.on("mouseenter",function(){
						$(this).addClass("bk").children(".scar_l").show();
					}).on("mouseleave",function(){
						$(this).removeClass("bk").children(".scar_l").hide();
					})
					//显示头部购物车的内容
					  var $carlist = $(".scar_l ul");
					   var scargoods_data;
            if(getCookie("goods_states")){
            	$carlist.children().remove();
            	scargoods_data =JSON.parse(getCookie("goods_states")); 
            	$.each(scargoods_data,function(idx,item){
            		 var $Newimg_li = $("<li/>");
            		 var $title_div = $("<div/>");
            		 var $NewCloneImg =$("<img />").attr("src",item.src);
            		 
            		 $NewCloneImg.appendTo($Newimg_li);
            		 $("<p/>").addClass("ppp").html("<a href='detail.html'>"+item.head+"</a>").appendTo($title_div);
            		 $("<p/>").addClass("ppp1").html("&yen;"+item.price).appendTo($title_div);
            		 $title_div.appendTo($Newimg_li);
            		 $Newimg_li.appendTo($carlist); 
            	})
            }
					
					
			});

	//页面底部
	$('.goods_footer').load('footer_commen.html .footer');	
	
	
	
	//懒加载
  var $ul = $('.all_goods .all_list');
 //向服务器请求数据，然后对请求回来的数据进行遍历 
  $.ajaxSetup({
  	url:"../data/goodslist.json",
  	success:function(res){
		$.each(res,function(idx,item){
			 //创建li对象，遍历有多少个对象，就创建多少个li元素对象来存放遍历后的数据
				var $li = $('<li/>');
				var $a =$('<a/>').attr('href',item.url);
				$('<img/>').attr('src',item.imgurl).appendTo($a);
				$("<div/>").append($a).appendTo($li);
				$('<p/>').html('<a href='+ item.url +'>'+ item.title +'</a>').appendTo($li);
				$('<del/>').html('&yen;'+item.price).appendTo($li);
				$('<p/>').addClass('list_price').html('特惠价：'+2499).appendTo($li);
				$ul.append($li);
			});
			$ul.appendTo($(".all_goods"));
  	}
  	
  })
	
	
	$.ajax();
	//控制懒加载的次数
	var count3 = 0;
	$(window).on('scroll',function(){
		var scrollTop = $(window).scrollTop();	
		if(scrollTop >= $(document).height()-$(window).height()-2800){
			count3++;
			if(count3 >=2){
				return ;
			}
			$.ajax();
		}
	})
	

//列表页的左部分
   var $h4 = $(".gl_L1 .com_b");
// var $bg = $h4.children("i");
   var $L1_list = $('.gl_L1 .L1-list');
   var j = 0;
   //点击各项商品的头部，展示和隐藏其子内容
   $.each($h4, function(idx,ele) {
   	   $(this).on("mousedown",function(){
   	   	$(this).next().slideToggle();
// 	     	j++;
// 	   	  if(j %2 == 0){
// 	   	  	$(this).next().slideDown();
// 	   	  	$(this).children("i").css("background","url(../css/img/pic_arrow_u.gif)");
// 	   	  }else{
// 	   	  	$(this).next().slideUp();
// 	   	  	$(this).children("i").css("background","url(../css/img/pic_arrow_r.gif)");
// 	   	  }
   	   	   
   	   })
   });
   
  //品牌 点击进行收缩
  
   $(".gl_L2").on("click",".L2_B",function(){
   	 $(this).next().fadeToggle(500);
   })
 //价格
   $(".gl_L3").on("click",".L3_B",function(){
   	 $(this).next().fadeToggle(500);
   })

  //颜色
  //给选中那个尺码一个边框 
  $(".gl_L4 .L4_list").on("click","li",function(){
   	 $(this).addClass("LI_Bian").siblings("li").removeClass("LI_Bian");
   })
  
  //图片放大  （商品列表页）
  $(".all_goods .all_list").on("mouseenter","div",function(){
  	//让鼠标移进图片时，让图片运动
  	 $(this).find("img").stop().animate({width:300,height:300,left:-45,top:-15});
  }).on("mouseleave","div",function(){
  	 $(this).find("img").stop().animate({width:210,height:251,left:0,top:0});
  })
})
