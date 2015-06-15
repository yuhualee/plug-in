window.onload = function(){
	var obtn = document.getElementById('btn');
	var winH = document.documentElement.clientHeight;
	var timer = null;
	var move = true;

	window.onscroll = function(){
		var sTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(sTop >= winH){
			obtn.style.display = "block";
		}else{
			obtn.style.display = "none";
		}
		if(!move){
			clearInterval(timer);
		}
		move = false;
	}

	obtn.onclick = function(){
		timer = setInterval(function(){
			// 获取滚动条的位置
			var sTop = document.documentElement.scrollTop || document.body.scrollTop;
			var speed = Math.floor( - sTop / 10);
			document.documentElement.scrollTop = document.body.scrollTop = sTop + speed;
			move = true;
			if(sTop == 0){
				clearInterval(timer);
			}

		},10);
		
	};
	
};