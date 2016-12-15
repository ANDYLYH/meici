			$(function(){
				var $olist = $("#small-carouser ul");
				var $li = $olist.children('li');
				var $firstImg = $olist.find('img').eq(0);
				var imgWidth = $li.eq(0).width();
				
				// 初始化
				var index = 0;
				$li.each(function(){
					$(this).clone().appendTo($olist);
				});
				var len = $olist.children().length;
				//设置ul的宽度
				$olist.css({
					width:$li.eq(0).width()*len,
					height:$li.eq(0).height()
				});

				var timer = setInterval(move,3000);
				function move(){
					index++;
					showPic();
				
				}
				// 图片展示效果
			   function showPic(){
					$olist.animate({left:-imgWidth*index},next);
				  }
			   
				function next(){
				if(index >= len/2){
					$olist.css({left:0});
					index = 0;
				}else if(index < 0){
					$olist.css({left:-(len/2)*imgWidth});
					index = len/2 -1;
				}
			}	
            //	
			$("#prev").on("click",function(){
				clearInterval(timer);
				index--;
				showPic();
				timer = setInterval(move,3000);
			})
			//
			$("#next").on("click",function(){
				clearInterval(timer);
				index++;
				showPic();
				timer = setInterval(move,3000);
			})
			//鼠标移入 移出
			$olist.on("mouseenter",function(){
				clearInterval(timer);
			}).on("mouseleave",function(){
				timer = setInterval(move,3000);
			})
			
	})