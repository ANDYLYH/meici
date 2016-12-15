
jQuery(function($){
	
 
        
		     //页面顶部
					$('.main_head').load('html/header2.html .hh',function(){
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
				
				
			 if(getCookie("goods_states")){
					$("#cuont_goods").html(JSON.parse(getCookie("goods_states")).length);
					}
			  
			  //页面头部显示的购物车数量的那部分，当鼠标引进去时，把已添加的内容显示出来
					var $car_l = $(".right_3");
					$car_l.on("mouseenter",function(){
						$(this).addClass("bk").children("div").show(); //移进去时，显示
					}).on("mouseleave",function(){
						$(this).removeClass("bk").children("div").hide();//移出去，隐藏
					})
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
                            		 $("<p/>").addClass("ppp").html("<a href='#'>"+item.head+"</a>").appendTo($title_div);
                            		 $("<p/>").addClass("ppp1").html("&yen;"+item.price).appendTo($title_div);
                            		 $title_div.appendTo($Newimg_li);
                            		 $Newimg_li.appendTo($carlist); 
                            	})
                            }
                    
				
			});

	
	//导航栏
	var $olist =$(".main_nav .main_nav_bd .nav_list");
	var $oli = $olist.children();
	//二级导航栏
	$.each($oli, function(idx,ele){  //对一级导航栏进行遍历
		$(this).on("mouseenter",function(){
			$(this).addClass("active").children("div").show(); //显示对应的二级导航栏
			$(this).children("a").css({"color":"#FFFFFF","background":"#8e0c3a"});
		}).on("mouseleave",function(){
			$(this).removeClass("active").children("div").hide();
			$(this).children("a").css({"color":"#333333","background":"#FFFFFF"});
		})
	});
	
	//时尚导购   ，吸顶菜单上的时尚导购 下的二级菜单的显示和隐藏
	$(".fashion_gou").on("mouseover",function(){
		$("#fashion_g1").show();  //移进去显示
	}).on("mouseout",function(){
		$("#fashion_g1").hide();  //移出去隐藏
	})


 //页面右下角的固定定位    导航
  var $fixed_li = $(".fixed_logo li");
  $.each($fixed_li ,function(){
  	$(this).on("mouseenter",function(){
  		var x = $(this).index();
  		$(this).css("background","url(../css/img/consult.jpg) no-repeat -52px "+x*(-46)+"px");
  	}).on("mouseleave",function(){
  		var x = $(this).index();
  		$(this).css("background","url(../css/img/consult.jpg) no-repeat 0px "+x*(-46)+"px");
  	})
  })
	
	
	
	
	
	var $bot_form = $("#bot_form .bot_formL1");
	var $botformIN = $bot_form.find("form");
	
	$bot_form.on("click","h3",function(){
		console.log(333);
		$(this).addClass("moren").siblings("h3").removeClass("moren");
		var index = $(this).index();
		$botformIN.eq(index).show().siblings("form").hide();
	})
	
	$("#bto_close").click(function(){
		
		$(this).parent().parent().hide();
	})
	
	

});
