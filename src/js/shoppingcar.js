
		jQuery(function($){
		
            var all_price = 0;
             var goods;
            if(getCookie("goods_states"))
            {
            	 goods =JSON.parse(getCookie("goods_states"));
            }else{
            	goods = [];
            }
            

			var $empty = $(".car_tips");
			var $car_box = $(".goods_num");
	        var $new_ul2 = $("<ul/>");
            $new_ul2.addClass("pro");
	
	
	
	    //货物遍历封装成一个函数
		 function list_updata(x){
		 	 $.each(x,function(idx,ele){
            //购物车里面商品的详情
            all_price +=parseInt(ele.price);
           
            var $new_li = $("<li/>");
            var $new_img = $("<a/>");
            $new_img.attr({"class":"pic","href":"#"});
            $("<img/>").addClass("img1").attr("src",ele.src).appendTo($new_img);
            $new_img.appendTo($new_li);
            $("<p/>").addClass("tit").html("<a href='../html/detail.html'>"+ele.head+"</a>&nbsp;<br/>尺码："+ele.size).appendTo($new_li);
            $("<p/>").addClass("count").html("1").appendTo($new_li);
            $("<p/>").addClass("price").html("&yen;"+ele.price).appendTo($new_li);
            //两个小按钮
            var $btnp = $("<p/>");
            $("<span/>").html("移至收藏").appendTo($btnp);
            $("<span class='delete1'/>").html("删除商品").appendTo($btnp);
            $btnp.addClass("btn").appendTo($new_li);
            $new_li.appendTo($new_ul2);
            $new_ul2.appendTo($new_div);
            })
            //将货物详情放进盒子里面
            $new_div.addClass("car_box").appendTo($(".shopping_cart"));
		 }

			//判断获取到的数据的长度是否为零，如果不为零，说明
           if(goods.length !== 0){
           	$empty.hide();
           	var $new_div = $("<div/>");
           	 var $all_div = $("<div/>");
           	var $pay_div = $("<div/>");
            var $new_ul1 = $("<ul/>");
             $new_ul1.addClass("list");
            
           //商品详情
            $("<div/>").addClass("tips").html("<i></i>成功将 "+goods[goods.length-1].head+" 加入购物袋。").appendTo($(".shopping_cart"));
           
           
            //初始样式  头部
            $("<li/>").html("商品图片").appendTo($new_ul1);
            $("<li/>").css("width","510px").html("商品名称").appendTo($new_ul1);
            $("<li/>").css("width","150px").html("数量").appendTo($new_ul1);
            $("<li/>").html("单价").appendTo($new_ul1);
            $("<li/>").html("操作").appendTo($new_ul1);
            //将初始样式添加到盒子里面
            $new_div.append($new_ul1);
            //遍历
            list_updata(goods);
            //统计下一下货物全部价格
            $all_div.addClass("all").html("<i>￥"+ all_price.toFixed(2)+"</i><span>"+"总计（不含运费）:"+"</span>").appendTo($(".shopping_cart"));
            //设置一个连接，跳转到列表页
            $("<span/>").html("<a href='goods_list.html'>&lt;继续购物</a>").appendTo($pay_div);
            
            $("<button/>").appendTo($pay_div);
            $pay_div.addClass("pay").appendTo($(".shopping_cart"));
           }else{
           	$empty.show();
           }
        
          //删除购物车指定商品
           $(".btn").on("click",".delete1",function(){
          	var btn_num = $(this).parent().parent().parent().index();
          	 //删除goods对象里的内容
             goods.splice(btn_num-1,1);
             $(this).parent().parent().remove();
             var d = new Date();
			d.setDate(d.getDate()+100);
			setCookies("goods_states",JSON.stringify(goods),d,"/");//重新设置cookie
            goods =JSON.parse(getCookie("goods_states")); //获取cookie
            if(goods.length !== 0){
            	all_price = 0;
            	$.each(goods, function(idx,ele) {
            		all_price +=parseInt(ele.price);	
            	});	
            }else{
            	//在数据货物清空时，要事先把购物车其他样式清除
            	$(".tips").remove();
            	$(".all").remove();
            	$(".pay").remove();
            	$new_ul1.remove();
            	$empty.show();
            }
            console.log(all_price)
           $(".all").find("i").html("￥"+all_price);

		})
})