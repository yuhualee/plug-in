/* jshint node:true */
'use strict';

/*global $:false*/
// ;(function($,undefined){
// })(Zepto);

$(function(){

	// console.log("--- start");

	var startPostion = 0, moveDistanceY;
	var img = $('.wrap .topPic');
	var biggerH = $(window).height();

	img.height(biggerH);
	var imgHeight = img.height();


	$(document).on('touchstart',function(e){

		// e.preventDefault();
		var touchs = e.changedTouches[0];
		startPostion = touchs.pageY;

	}).on('touchmove',function(e){



		
		var touchs = e.changedTouches[0];
		moveDistanceY = touchs.pageY - startPostion;

		// move(-moveDistanceY);

		// console.log(img, moveDistanceY, imgHeight);

		
		console.log(document.body.scrollTop);

		if(imgHeight>200 || (document.body.scrollTop === 0 && moveDistanceY>0 )){
			e.preventDefault();
			imgHeight = imgHeight + moveDistanceY;
			img.height(imgHeight);
		}


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
