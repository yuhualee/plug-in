/* jshint node:true */
'use strict';

/*global $:false,Zepto:false */
// ;(function($,undefined){
// })(Zepto);

$(function(){

	var startPostion = 0, moveDistanceY;
	var img = $(".wrap .topPic");
	var biggerH = $(window).height();
	var smallerH = $(window).width()*0.63;
	

	img.height(biggerH);
	var imgHeight = img.height();

	var text = img.children(".text");
	var opacity;

	$(img).on('touchstart',function(e){

		imgHeight = img.height();

		// e.preventDefault();
		var touchs = e.changedTouches[0];
		startPostion = touchs.pageY;

	}).on('touchmove',function(e){

		e.preventDefault();
		var touchs = e.changedTouches[0];
		moveDistanceY = touchs.pageY - startPostion;

		imgHeight = imgHeight + moveDistanceY;

		img.height(imgHeight);
		 

		// opacity
		if(moveDistanceY > 0){
			opacity = imgHeight / (biggerH-smallerH);
			text.css("opacity",opacity);
		}else{
			opacity = (biggerH - smallerH )/imgHeight;
			text.css("opacity",1-opacity);
		}
		// img

		
		startPostion = touchs.pageY;

	}).on('touchend',function(){
		if(moveDistanceY > 0){
			img.height(biggerH);
			text.css("opacity",1);
		}else{
			img.height(smallerH);
			text.css("opacity",0);
		}
	});


	// $(".wrap .topPic").on("tap",function(){
	// 	if($(this).height() == biggerH){
	// 		$(this).height(smallerH);
	// 	}else{
	// 		$(this).height(biggerH);
	// 	}
	// });

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
