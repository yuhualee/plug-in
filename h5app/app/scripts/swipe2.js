/* jshint node:true */
'use strict';

/*global $:false,Zepto:false */
// ;(function($,undefined){
// })(Zepto);

$(function(){
	var winH = $(window).height();
	var winW = $(window).width();

	$(".wrap .topPic").height(winH);
	
	$(".wrap .topPic").on("tap",function(){
		if($(this).height() == winH){
			$(this).height(winW*0.63);
		}else{
			$(this).height(winH);
		}
	});
	$(".wrap .topPic").on("swipeUp",function(){
			$(this).height(winW*0.63);
	});
	$(".wrap .topPic").on("swipeDown",function(){
		$(this).height(winH);
	});
	document.addEventListener('touchmove', function (event) {
				event.preventDefault();
			}, false);
	
});
