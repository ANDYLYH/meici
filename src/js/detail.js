jQuery(function($) {

	
	var goods_states;
	var $obj = {}

	//头部  ，通过load的形式，把公共头部调用过来
	$('#dd').load('header.html .hh', function() {
      var size = 38;
		//导航栏
		var $olist = $(".main_nav .main_nav_bd .nav_list");
		var $oli = $olist.children();
		//二级导航栏 ，显示二级导航，当鼠标移到所对应的对象，高亮，显示其下的二级菜单
		$.each($oli, function(idx, ele) {
			$(this).on("mouseenter", function() {
				$(this).addClass("active").children("div").show();
				$(this).children("a").css({
					"color": "#FFFFFF",
					"background": "#8e0c3a"
				}); //移进去，高亮
			}).on("mouseleave", function() {
				$(this).removeClass("active").children("div").hide();
				$(this).children("a").css({
					"color": "#333333",
					"background": "#FFFFFF"
				}); //移出去，恢复
			})
		});

		//页面头部显示的购物车数量的那部分，当鼠标引进去时，把已添加的内容显示出来
		var $car_l = $(".right_3");
		$car_l.on("mouseenter", function() {
			$(this).addClass("bk").children("div").show(); //移进去时，显示
		}).on("mouseleave", function() {
			$(this).removeClass("bk").children("div").hide(); //移出去，隐藏
		})

		//加入购物袋 ， 获取元素节点
		var $obtn1 = $(".HR_btn #btn2");
		var $ospan = $("#cuont_goods");
		var $oul = $("#HR_LIST");
		var $oli = $oul.children();
		var $oa = $oul.siblings("h3").children("a");
		var $otit = $oul.siblings(".tit");
		var $oprice = $oul.siblings(".th").children("span");
		var $oimg = $(".content_HM").children("img");

		//选择尺码
		$.each($oli, function() {
			$oli.on("click", function() {
				size = $(this).html();
			})
		});
		
		//尺码的选择 ，给对应被选择的对象一个高亮
			var $r_li = $("#HR_LIST li");
			$.each($r_li, function(idx, item) {
				$(this).on("click", function() {
					$(this).addClass("HR_active").siblings().removeClass("HR_active");
				})
			});
		
		

		//获取cookie 初始值
		if(getCookie("goods_states")){
				 $("#cuont_goods").html(JSON.parse(getCookie("goods_states")).length);
				}
	

		//获取头部购物车列表
		var $carlist = $(".scar_l ul");

		//加入购物袋  点击事件
		$obtn1.on("click", function() {
			//首先判断cookie是否为空，若不为空，则在原基础上添加数据，防止之前的数据被目前的数据覆盖
			if(getCookie("goods_states")) {
				goods_states = JSON.parse(getCookie("goods_states"));
				$obj = {//获取货物信息，创建一个对象
					"src": $oimg.attr("src"),
					"head": $oa.html() + $otit.html(),
					"price": $oprice.html(),
					"size": size
				};
				goods_states.push($obj);//将一个货物对象存进数组里面
			} else {
				goods_states = [];
				$obj = {  //获取货物信息，创建一个对象
					"src": $oimg.attr("src"),
					"head": $oa.html() + $otit.html(),
					"price": $oprice.html(),
					"size": size
				};
				goods_states.push($obj); //将一个货物对象存进数组里面
			}
			//设置cookie
			var d = new Date();
			d.setDate(d.getDate() + 100);
			//在存cookie之前要先把所要存的数据转化成字符串类型
			setCookies("goods_states", JSON.stringify(goods_states), d, "/");
			//给头部的购物车提示添加内容
            //获取cookie 货物件数
	     	if(getCookie("goods_states")){
				 $("#cuont_goods").html(JSON.parse(getCookie("goods_states")).length);
				}
			var $bigimg_div = $(this).parent().parent().prev();
			var $BigImg = $bigimg_div.find("img"); //获取大图img元素节点

			var $CloneImg = $BigImg.clone(); //克隆图片
			var $BigImgPos = $BigImg.offset(); //获取大图的偏移量
			var $bigWidth = $BigImg.width();
			//给克隆好的图片一个位置
			$CloneImg.css({
				"position": "absolute",
				left: $BigImgPos.left,
				top: $BigImgPos.top,
				width: $bigWidth
			});
			//把克隆好的图片一个地址
			$CloneImg.attr("src", "../img/big-1.jpg");
			//将图片放到body里面
			$("body").append($CloneImg);
			//给克隆好的图片一个运动的状态
			$CloneImg.animate({
				left: 970,
				top: 36,
				width: 0,
				"opacity": 0
			}, function() {
				//运动完成后要清除克隆图片  
				$CloneImg.remove();

				var scargoods_data;
				if(getCookie("goods_states")) {
					//在添加前要清空一下货物列表
					$carlist.children("li").remove();
					scargoods_data = JSON.parse(getCookie("goods_states"));
					//对获取回来的数据进行遍历
					$.each(scargoods_data, function(idx, item) {
						var $Newimg_li = $("<li/>");
						var $title_div = $("<div/>");
						var $NewCloneImg = $("<img />").attr("src", item.src);
						$NewCloneImg.appendTo($Newimg_li);
						$("<p />").html("<a href='#'>" + item.head + "</a>").appendTo($title_div);
						$("<p/>").html("&yen;" + item.price).appendTo($title_div);
						$title_div.appendTo($Newimg_li);
						$Newimg_li.appendTo($carlist);
					})
				}

			})

		})

		//页面头部购物车货物详情列表的创建
		var scargoods_data;
		//获取cookie，判断是否有商品添加到购物车，如果有则进行下面操作
		if(getCookie("goods_states")) {
			//在添加前要清空之前列表上的货物，避免重复
			$carlist.children().remove();
			scargoods_data = JSON.parse(getCookie("goods_states"));
			$.each(scargoods_data, function(idx, item) {
				var $Newimg_li = $("<li/>");
				var $title_div = $("<div/>");
				var $NewCloneImg = $("<img />").attr("src", item.src);

				$NewCloneImg.appendTo($Newimg_li);
				$("<p/>").addClass("ppp").html("<a href='#'>" + item.head + "</a>").appendTo($title_div);
				$("<p/>").addClass("ppp1").html("&yen;" + item.price).appendTo($title_div);
				$title_div.appendTo($Newimg_li);
				$Newimg_li.appendTo($carlist);
			})
		}

	});

	//底部
	$(".detail_foot").load("footer_commen.html .footer")
		//放大镜部分，通过点击小图进行大图地址的替换
	var $l_list = $(".content-HL .d-list");
	var $l_li = $l_list.children();
	var $img = $(".content_HM img");
	var x = 0;
	$.each($l_li, function(idx, item) {
		$(this).on("mouseenter", function() {
			x = $(this).index() + 1;
			$(this).addClass("HL_active").siblings().removeClass("HL_active");
			$img.attr("src", '../img/big-' + x + '.jpg');
			$img.attr("data-big", '../img/big-' + x + '.jpg');
		})

	});
	//调用插件，实现放大镜功能
	$('.content_HM').xzoom({
		position: 'right'
	});

	

	//了解商品 ，选择客户想要了解部分

	var $btn = $(".mag_btn button");

	$.each($btn, function(idx, item) {

		$(this).on("click", function() {

			$(this).addClass('mag_btn1').siblings().removeClass('mag_btn1');
			for(var j = 0; j < 3; j++) {
				if(j === idx) {
					$('.all_mag' + j).show(1000);
				} else {
					$('.all_mag' + j).hide(1000);
				}

			}
		})
	})

});