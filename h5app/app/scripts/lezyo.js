/* jshint node:true */
'use strict';

/*global $:false,Zepto:false */
;(function($,undefined){
	$.fn.fullSlide = function(options){
		
		options = $.extend({
			slide: '.page',
			c1: '.balloon',
			c2: '.label',
			c3: '.theme',
			currentIndex: 0,
			totalIndex: $('.page').length,
			callback: function(){}
		},options);
		
		var wrap = $(this),
			winH = $(window).height(),
			currentIndex = options.currentIndex,
			items = wrap.find(options.slide);

		var init = function(){
			wrap.height(winH);
			// setIndex();
			var prevIndex = currentIndex - 1 < 0 ? items.length-1 : currentIndex - 1;
			var nextIndex = currentIndex + 1 >= items.length ? 0 : currentIndex + 1;
			var startPostion = 0, 
				moveDistanceY;
			console.log(prevIndex+','+currentIndex+','+nextIndex);

			setCurrent(currentIndex);

			$('body').on('touchstart',function(e){
				e.preventDefault();
				var touchs = e.changedTouches[0];
				startPostion = touchs.pageY;
			}).on('touchmove',function(e){
				e.preventDefault();
				var touchs = e.changedTouches[0];
				moveDistanceY = touchs.pageY - startPostion;
				startPostion = touchs.pageY;
			}).on('touchend',function(){
				console.log(moveDistanceY);
				if(moveDistanceY > 0){
					setCurrent(prevIndex,function(){
						options.callback(options.c1,options.c2,options.c3);
					});
					currentIndex = prevIndex;
				}else if(moveDistanceY < 0){
					setCurrent(nextIndex,function(){
						options.callback(options.c1,options.c2,options.c3);
					});
					currentIndex = nextIndex;
				}
				prevIndex = currentIndex - 1 < 0 ? items.length-1 : currentIndex - 1;
				nextIndex = currentIndex + 1 >= items.length ? 0 : currentIndex + 1;
			});
		};

		// var setIndex = function(){
		// 	$(options.slide).each(function(i){
		// 		$(this).data('index',i);
		// 	});
		// };

		var setCurrent = function(currentIndex,callback){
			$(options.slide).each(function(i){
				if(i === currentIndex){
					$(this).addClass('current');
					if(typeof callback === 'function'){
						callback();
					}
				}else{
					$(this).removeClass('current');
					if(typeof callback === 'function'){
						callback();
					}
				}
			});
		};


		init();
		
	};
})(Zepto);

$(function(){

	$('.wrap').fullSlide({
		// callback: function(c1, c2,c3){
		// }
	});
	
});