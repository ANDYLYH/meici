jQuery(function($){
	
	/**************************登录验证***************************/
	var $form = $(".fixed_form2"); //获取表单
	var $input = $form.find("input"); //获取登录表单内的所有input节点
	var $obtn = $("#btn4"); //获取登录按钮元素节点
 	var $op = $("#botentry_t"); //获取信息提醒框所在元素节点
 
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
		            				window.location ="index2.html";
		            			}
		            		})
		            	} 
		            	$op.html("此手机号未注册");
		            	return false;
		                }else{
	                    	$op.html("请完善登录信息");
	                    	return false;
	                   }
		         })
		        
		        
		        
	/**************************注册验证***************************/
	
	           var usernameData;
                var obj2 = {};
		        
		        //获取到元素节点
				var $oform = $(".fixed_form1");
				var $ophone =$oform.find("input");
				var $op1 = $("#botentry_t1");
				var $obtn5 =$("#btn5");
                
				var flag1 = flag2=flag3 = false;
				//邮箱手机号验证
				$ophone.eq(0).on("blur",function(){
					var Get_cookie = [];
					var value = $(this).val();
					var Reg1 = /^[1-3]\d{10}$/; //手机号
					var Reg2 = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;//邮箱
					
					var flag = Reg1.test(value) || Reg2.test(value);
					
					if(value ==""){ //判断输入框是否为空，若为空，则弹出提示信息
						$op1.html("请输入您的手机号或常用邮箱。");
						flag1 = false;
						return;
					}else{
						if(!flag){
                    	$op1.html("请输入正确的邮箱或手机号。");
                    	flag1 = false;
						}else{
							$op1.html("");
							flag1 =true;
						}
					}
					
					if(getCookie("usermassage")){
						Get_cookie = JSON.parse(getCookie("usermassage"));
						$.each(Get_cookie, function(idex,item) {
							if(item.userphone == value){
								$op1.html("此手机号以被注册");
								flag1 = false;
								return;
							}else{
								flag1 = true;
							}
							
						});
					}
					
					
				})
				//密码验证
				$ophone.eq(1).on("blur",function(){
					var value = $(this).val(); //获取文本框内容
					var reg = /^\w{6,16}$/; //正则表达式
			        
			        if(value ==""){
						$op1.html("请输入您的请重新输入一次上面的密码。");
						flag2 = false;
						return;
					}
					var flag = reg.test(value); // 检测密码是否符合规定格式
                    if(!flag){
                    	$op1.html("用户密码长度范围在6~16位之间.");
                    	flag2 = false;
                    }else{
                    	$op1.html("");
                    	flag2 = true;
                    }
				})
//	            //确认密码验证
	            $ophone.eq(2).blur(function(){
					var value1 = $ophone.eq(1).val();
					var value2 = $(this).val();
			
                    if(value1 !== value2){
                    	$op1.html("您两次输入的密码不一致。");
                    	flag3 = false;
                    }else{
                    	flag3 = true;
                    }
				})
	            
	            //点击开始注册
	            $obtn5.on("click",function(){
	            	if(flag1&&flag2&&flag3){

	            		var phone = $ophone.eq(0).val();
		            	var password1 = $ophone.eq(1).val();
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
	            		$op1.html("请完善信息");
	            		return false;
	            	}
		            	
	           })
	            
	
	
	
 })		        