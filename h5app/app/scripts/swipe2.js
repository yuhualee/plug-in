/* jshint node:true */
'use strict';

/*global $:false,Zepto:false */
// ;(function($,undefined){
// })(Zepto);

$(function(){

	console.log("--- start");

	var startPostion = 0, moveDistanceY;
	var img = $(".wrap .topPic");
	var imgHeight = img.height();


	$('body').on('touchstart',function(e){

		// e.preventDefault();
		var touchs = e.changedTouches[0];
		startPostion = touchs.pageY;

	}).on('touchmove',function(e){

		e.preventDefault();
		var touchs = e.changedTouches[0];
		moveDistanceY = touchs.pageY - startPostion;

		// move(-moveDistanceY);

		console.log(img, moveDistanceY, imgHeight);

		imgHeight = imgHeight + moveDistanceY;

		img.height(imgHeight);



		startPostion = touchs.pageY;

	});

	/*
	$(document).on("swipeUp",function(){
		
		console.log("---swipeUp");
	}).on('touchmove',function(e){

		console.log("---touchmove");
		e.preventDefault();
		// var touchs = e.changedTouches[0];
		// moveDistanceY = touchs.pageY - startPostion;
		// move(-moveDistanceY);
		// startPostion = touchs.pageY;

	});
	*/


	/*
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

	*/
	
});
