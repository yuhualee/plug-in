/* jshint node:true */
'use strict';

/*global $:false */

$(function(){

	var startPostion = 0, moveDistanceY;
	var img = $('.wrap .topPic');
	var biggerH = $(window).height();
	var smallerH = $(window).width()*0.63;

	img.height(biggerH);
	var imgHeight = img.height();

	var text = img.children('.text');
	var opacity;


	$(document).on('touchstart',function(e){

		var touchs = e.changedTouches[0];
		startPostion = touchs.pageY;

	}).on('touchmove',function(e){
	
		var touchs = e.changedTouches[0];
		moveDistanceY = touchs.pageY - startPostion;


		if(imgHeight>smallerH || (document.body.scrollTop <= 0 && moveDistanceY>0 )){
			e.preventDefault();
			imgHeight = imgHeight + moveDistanceY;
			img.height(imgHeight);
		}

		img.height(imgHeight);

		// opacity
		if(document.body.scrollTop === 0){
			if(moveDistanceY > 0){
				opacity = imgHeight / (biggerH-smallerH);
				text.css('opacity',opacity);
			}else{
				opacity = smallerH /imgHeight;
				text.css('opacity',1-opacity);
			}
		}else{
			text.css('opacity',0);
		}

		startPostion = touchs.pageY;

	}).on('touchend',function(){
		if(moveDistanceY > 0 && document.body.scrollTop <= 0){
			img.animate({height:biggerH},200);
			text.animate({opacity:1},200);
			imgHeight = biggerH;
		}else if(moveDistanceY < 0 ){
			img.animate({height:smallerH},200);
			text.animate({opacity:0},200);
			imgHeight = smallerH;
		}
	});

	img.on('tap',function(){
		if(document.body.scrollTop === 0){
			if($(this).height() === biggerH){
				$(this).animate({height:smallerH},400);
				text.animate({opacity:0},400);
				imgHeight = smallerH;
			}else{
				$(this).animate({height:biggerH},400);
				text.animate({opacity:1},400);
				imgHeight = biggerH;
			}
		}

	});

});
