$(function(){
	var main = $(".main").eq(0);
	var	winInnerW = $(window).innerWidth();
	var	winInnerH = $(window).innerHeight();
	var startW = 1000;
	var startH = 600;

	resize();

	function resize(){
		var is = 0;  //比例
		var iw = 0; //宽度
		var ih = 0;  //高度
		var il = 0;   //左
		if(winInnerW>startW && winInnerH>startH){
			main.css({"width":winInnerW+"px","height":winInnerH+"px","webkitTransform":"scale(1)"});
		}else{
			if(winInnerW/startW > winInnerH/startH){
				is = winInnerH/startH;
				iw = winInnerW/is;
				ih = winInnerH;
			}else{
				is = winInnerW/startW;
				iw = startW;
				ih = winInnerH/is;
			}
			il = (winInnerW - iw)/2;
			main.css({"width":iw+"px","height":ih+"px","webkitTransform":"scale("+is+")","left":il+"px"});
		}
	}
});