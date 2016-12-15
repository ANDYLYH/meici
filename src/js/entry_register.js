
	onload=function(){
                var usernameData;
                var obj2 = {};
		        //获取cookie 将物品数量显示在头部的购物车上
				 if(getCookie("goods_states")){
					$("#cuont_goods").html(JSON.parse(getCookie("goods_states")).length);
					}
		        //获取到元素节点
				var oform = document.getElementsByTagName("form")[1];
				var ophone = oform.getElementsByTagName("input");
				var op = document.getElementById("register_t");
				var obtn =document.getElementById("btn1");
			
				var flag1 = flag2=flag3 = false;
				//邮箱手机号验证
				ophone[0].onblur=function(){
					var Get_cookie = [];
					var value = this.value;
					var Reg1 = /^[1-3]\d{10}$/; //手机号
					var Reg2 = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;//邮箱
					
					var flag = Reg1.test(value) || Reg2.test(value);
					
					if(value ==""){ //判断输入框是否为空，若为空，则弹出提示信息
						op.innerHTML = "请输入您的手机号或常用邮箱。";
						flag1 = false;
						return;
					}else{
						if(!flag){
                    	op.innerHTML = "请输入正确的邮箱或手机号。";
                    	flag1 = false;
						}else{
							op.innerHTML = "";
							flag1 =true;
						}
					}
					
					if(getCookie("usermassage")){
						Get_cookie = JSON.parse(getCookie("usermassage"));
						$.each(Get_cookie, function(idex,item) {
							if(item.userphone == value){
								op.innerHTML = "此手机号以被注册";
								flag1 = false;
								return;
							}else{
								flag1 = true;
							}
							
						});
					}
					
					
				}
				//密码验证
				ophone[1].onblur=function(){
					var value = this.value; //获取文本框内容
					var reg = /^\w{6,16}$/; //正则表达式
			        
			        if(value ==""){
						op.innerHTML = "请输入您的请重新输入一次上面的密码。";
						flag2 = false;
						return;
					}
					var flag = reg.test(value); // 检测密码是否符合规定格式
                    if(!flag){
                    	op.innerHTML = "用户密码长度范围在6~16位之间.";
                    	flag2 = false;
                    }else{
                    	op.innerHTML ="";
                    	flag2 = true;
                    }
				}
	            //确认密码验证
	            ophone[2].onblur=function(){
					var value1 = ophone[1].value;
					var value2 = this.value;
			
                    if(value1 !== value2){
                    	op.innerHTML = "您两次输入的密码不一致。";
                    	flag3 = false;
                    }else{
                    	flag3 = true;
                    }
				}
	            
	            //点击开始注册
	            obtn.onclick=function(){
	            	if(flag1&&flag2&&flag3){

	            		var phone = ophone[0].value;
		            	var password1 = ophone[1].value;
	            	    //设置cookie
	            	    var d = new Date();
	    				d.setDate(d.getDate()+100);
	    				
	    				if(getCookie("usermassage")){
	            			usernameData = JSON.parse(getCookie("usermassage"));
	            			obj2 ={"userphone":phone,"UserPassword":password1};
	            			usernameData.push(obj2);
	            		}else{
	            			usernameData = [];
	            			obj2 ={"userphone":phone,"UserPassword":password1};
	            			usernameData.push(obj2);
	            		}
	    				setCookies("usermassage",JSON.stringify(usernameData),d,"/");
	    				console.log(JSON.parse(getCookie("usermassage")));
	    				alert("恭喜你！注册成功。");
	    				
	            	}else{
	            		op.innerHTML = "请完善信息";
	            		return false;
	            	}
		            	
	            }
	            
	            
	            
	          //页面头部显示的购物车数量的那部分，当鼠标引进去时，把已添加的内容显示出来
					var $car_l = $(".right_3");
					$car_l.on("mouseenter",function(){
						console.log(2222);
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
	            
	            
	            
	            
	            
	
}




