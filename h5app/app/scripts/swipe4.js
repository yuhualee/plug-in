/* jshint node:true */
'use strict';

/*global $:false,Zepto:false */

$(function(){

	var startPostion = 0, moveDistanceY;
	var img = $(".wrap .topPic");
	var biggerH = $(window).height();
	var smallerH = $(window).width()*0.63;

	img.height(biggerH);
	var imgHeight = img.height();

	var text = img.children(".text");
	var opacity;


	$(document).on('touchstart',function(e){

		var touchs = e.changedTouches[0];
		startPostion = touchs.pageY;

	}).on('touchmove',function(e){
	
		var touchs = e.changedTouches[0];
		moveDistanceY = touchs.pageY - startPostion;


		if(imgHeight>smallerH || (document.body.scrollTop == 0 && moveDistanceY>0 )){
			e.preventDefault();
			imgHeight = imgHeight + moveDistanceY;
			img.height(imgHeight);
		}


		img.height(imgHeight);

		// opacity
		if(moveDistanceY > 0){
			opacity = imgHeight / (biggerH-smallerH);
			text.css("opacity",opacity);
		}else{
			opacity = smallerH /imgHeight;
			text.css("opacity",1-opacity);
		}

		startPostion = touchs.pageY;

	// }).on('touchend',function(e){
	// 	if(moveDistanceY > 0 && document.body.scrollTop == 0){
	// 		img.height(biggerH);
	// 		text.css("opacity",1);
	// 	}else if(moveDistanceY < 0 ){
	// 		img.height(smallerH);
	// 		text.css("opacity",0);
	// 	}

	});

});
