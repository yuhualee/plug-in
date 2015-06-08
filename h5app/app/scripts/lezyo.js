/* jshint node:true */
'use strict';

/*global $:false,Zepto:false */
;(function($,undefined){
	$.fn.fullSlide = function(options){
		
		options = $.extend({
			slide: '.page',
			currentIndex: 0,
			totalIndex: $(".page").length,
			callback: function(){}
		},options);
		
		var wrap = $(this),
			winH = $(window).height(),
			currentIndex = options.currentIndex,
			items = wrap.find(options.slide),
			moving = false;

		var init = function(){
			wrap.height(winH);
			// setIndex();
			var prevIndex = currentIndex - 1 < 0 ? items.length-1 : currentIndex - 1;
			var nextIndex = currentIndex + 1 >= items.length ? 0 : currentIndex + 1;
			var startPostion = 0, 
				moveDistanceY;

			setCurrent(currentIndex);

			$("body").on('touchstart',function(e){
				e.preventDefault();
				var touchs = e.changedTouches[0];
				startPostion = touchs.pageY;
			}).on('touchmove',function(e){
				e.preventDefault();
				var touchs = e.changedTouches[0];
				moveDistanceY = touchs.pageY - startPostion;
				startPostion = touchs.pageY;
			}).on('touchend',function(e){
				if(moveDistanceY > 0){
					setCurrent(prevIndex);
					currentIndex = prevIndex;
					console.log(currentIndex);
				}else{
					setCurrent(nextIndex);
					currentIndex = nextIndex;
					console.log(currentIndex);
				}
			})
		}

		var setIndex = function(){
			$(options.slide).each(function(i){
				$(this).data("index",i);
			})
		}

		var setCurrent = function(currentIndex){
			$(options.slide).each(function(i){
				if(i == currentIndex){
					$(this).addClass("current");
				}else{
					$(this).removeClass("current");
				}
			})
		}


		

		init();
		
	};
})(Zepto);

$(function(){

	$('.wrap').fullSlide({
		// callback: function(showIndex, hideIndex,currentItem,hideItem){
		// 	// console.log(showIndex, hideIndex,currentItem,hideItem);
		// 	$(hideItem).removeClass('animation');
		// 	$(currentItem).addClass('animation');
		// }
	});
	
});