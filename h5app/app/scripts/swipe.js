/* jshint node:true */
'use strict';

/*global $:false */

;(function($, undefined){

	$.fn.fullSlide = function(options){

		options = $.extend({
			slider: '.slider-li',
			callback: function(){}
		},options);

		var wrap = $(this),
			currentHeight = $(window).height(),
			currentIndex = 0,
			items = wrap.find(options.slider);
			console.log(wrap);

		var init = function(){
			wrap.height(currentHeight);

			items.css({
				"transform":"translateY("+(-currentHeight)+"px)",
				"webkitTransform":"translateY("+(-currentHeight)+"px)"
			}).get(0).style.transform = "translateY(0px)";

			var startPosition = 0,
				moveDistanceY;

			$("body").on('touchstart',function(e){

				var touch = e.targetTouches[0];

				startPosition = touch.pageY;

			}).on('touchmove',function(e){
				e.preventDefault();

				var touch = e.targetTouches[0];

				moveDistanceY = touch.pageY - startPosition;

				move(-moveDistanceY);

				startPosition = touch.pageY;

			}).on('touchend',function(){

				var currentTop = parseFloat(items.get(currentIndex).scrollTop);
				console.log(currentTop);
				var moveDistance = 0,
					showIndex = 0,
					hideIndex = 0;

				if(moveDistanceY<0){
					showIndex = currentIndex+1;
					hideIndex = currentIndex;
					moveDistance = currentHeight+currentTop;
				}else{
					showIndex = currentIndex;
					hideIndex = currentIndex+1;
					moveDistance = currentTop;
				}
				if(showIndex >= items.length) showIndex = 0;
				if(hideIndex >= items.length) hideIndex = 0;

				// 4 => 1
				move(moveDistance, 300, function(){
					options.callback(showIndex, hideIndex, items.get(showIndex), items.get(hideIndex));
				});
			});

		};

		var move = function(distance, duration, callback){

			duration = duration || 0;

			var easing = duration > 0 ? 'ease-in-out' : 'linear';

			currentIndex = 0;
			for(var i = 0 ; i < items.length ; i++){
				var top = parseFloat(items.get(i).scrollTop);
				console.log(top);
				if( top<=0 && top>-currentHeight){
					currentIndex = i;
					break;
				}
			}

			var nextIndex = (currentIndex + 1)%items.length,
				prevIndex = currentIndex - 1;

			prevIndex = prevIndex < 0 ? items.length + prevIndex : prevIndex;

			var current = items.get(currentIndex),
				next = items.get(nextIndex),
				prev = items.get(prevIndex);

			var currentTop = parseFloat(current.scrollTop);

			// next.style.top = (currentTop+currentHeight)+'px';
			// prev.style.top = (currentTop-currentHeight)+'px';
			next.style.transform = "translateY("+(currentTop+currentHeight)+"px)";
			prev.style.transform = "translateY("+(currentTop-currentHeight)+"px)";

			// $(next).animate({
			// 	top: (currentTop+currentHeight-distance)+'px',
			// }, duration, easing);


			// $(prev).animate({
			// 	top: (currentTop-currentHeight-distance)+'px',
			// }, duration, easing);

			// $(current).animate({
			// 	top: (currentTop-distance)+'px',
			// }, duration, easing, function(){
			// 	if(typeof callback == 'function')
			// 		callback();
			// });
			$(next).animate({
				transform: "translateY("+(currentTop+currentHeight-distance)+"px)"
			}, duration, easing);
			$(prev).animate({
				transform: "translateY("+(currentTop-currentHeight-distance)+"px)"
			}, duration, easing);

			$(current).animate({
				transform: "translateY("+(currentTop-distance)+"px)"
			}, duration, easing, function(){
				if(typeof callback == 'function')
					callback();
			});
		};

		init();
	}

})(Zepto)


$(function(){

	$('.swipt-wrap').fullSlide({
		callback: function(showIndex, hideIndex,currentItem,hideItem){
			// console.log(showIndex, hideIndex,currentItem,hideItem);
			$(hideItem).removeClass("animation");
			$(currentItem).addClass("animation");
		}
	});
	
});