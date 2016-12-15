
jQuery(function($){
	var $form = $(".entry_form"); //获取表单
	var $input = $form.find("input"); //获取登录表单内的所有input节点
	var $obtn = $("#btn2"); //获取登录按钮元素节点
 	var $op = $("#entry_t"); //获取信息提醒框所在元素节点
 	
 	var userdate;
 	
 	//获取货物的件数，显示在页面的头部
	if(getCookie("goods_states")){
	$("#cuont_goods").html(JSON.parse(getCookie("goods_states")).length);
	}
	       //定义标志位，来检测信息填对与否
	       var flag1 = flag2 = false;
	        //电话邮箱验证
	        $input.eq(0).on("blur",function(){
	         var value = $(this).val();  //获取输入框的内容
			var Reg1 = /^[1-3]\d{10}$/; //手机号
			var Reg2 = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;//邮箱
			
			
			var flag = Reg1.test(value) || Reg2.test(value);  //判断电话或邮箱是否符合要求格式
			if(value ==""){  //判断输入框是否为空，若为空，则弹出提示信息
				$op.html("请输入您的手机号或常用邮箱。");
				flag1 = false;
				return;
			}
			if(!flag){
				$op.html("请输入正确的邮箱或手机号。");
            	flag1 = false;
			}else{
				$op.html("");
				flag1 =true;
			}
	         	
	       })
		
		    //验证密码
		     $input.eq(1).on("blur",function(){
	               var value = $(this).val(); //获取文本框内容
					var reg = /^\w{6,16}$/; //正则表达式
			        
			        if(value ==""){
						$op.html("请输入您的请重新输入一次上面的密码。");
						flag2 = false;
						return;
					}
					var flag = reg.test(value); //判断密码是否符合要求的格式   通过一个正则表达式来判断
                    if(!flag){
                    	$op.html("用户密码长度范围在6~16位之间.");
                    	flag2 = false;
                    }else{
                    	$op.html("");
                    	flag2 = true;
                    }
	         })
		
		     
		     //点击 开始登录
		        $obtn.on("click",function(){
		        	var UserDetail = [];
	            	if(flag1&&flag2){ //判断信息是否已经全部正确填写
	            		//用户验证，判断此用户是否已注册
	            		var phone = $input.eq(0).val();
		            	var password1 = $input.eq(1).val();
		            	if(getCookie("usermassage")){
		            		UserDetail = JSON.parse(getCookie("usermassage"));
		            		$.each(UserDetail,function(idx,item){
		            			if(phone == item.userphone && password1 == item.UserPassword){
		            				alert("恭喜登录成功！")
		            				window.location = "../index2.html";
		            			}
		            		})
		            	} 
		            	$op.html("此手机号未注册或密码不对");
		            	return false;
		                }else{
	                    	$op.html("请完善登录信息");
	                    	return false;
	                   }
		         })
		        
		        
		        
		       //页面头部显示的购物车数量的那部分，当鼠标引进去时，把已添加的内容显示出来
					var $car_l = $(".right_3");
					$car_l.on("mouseenter",function(){
						console.log(2222);
						$(this).addClass("bk").children("div").show(); //移进去时，显示
					}).on("mouseleave",function(){
						$(this).removeClass("bk").children("div").hide();//移出去，隐藏
					})
					
					    //页面头部购物车详情   
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
                     
		        
		        
		        
		        
		        
		        
		        
})
