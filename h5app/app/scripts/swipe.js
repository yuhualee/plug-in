/* jshint node:true */
'use strict';

/*global $:false,Zepto:false */
;(function($,undefined){
	$.fn.fullSlide = function(options){
		
		options = $.extend({
			slide: '.page',
			currentIndex: 0,
			callback: function(){}
		},options);
		
		var wrap = $(this),
			winH = $(window).height(),
			currentIndex = options.currentIndex,
			items = wrap.find(options.slide),
			moving = false;

		var init = function(){
			wrap.height(winH);
			var prevIndex = currentIndex-1<0 ? items.length-1 : currentIndex-1;
			var nextIndex = currentIndex+1>=items.length ? 0 : currentIndex+1;
			var startPostion = 0, 
				moveDistanceY;

			setPos(currentIndex,prevIndex,nextIndex);

			//事件
			$('body').on('touchstart',function(e){

				e.preventDefault();
				var touchs = e.changedTouches[0];
				startPostion = touchs.pageY;

			}).on('touchmove',function(e){

				e.preventDefault();
				var touchs = e.changedTouches[0];
				moveDistanceY = touchs.pageY - startPostion;
				move(-moveDistanceY);
				startPostion = touchs.pageY;

			}).on('touchend',function(){
				var currentTop = $(items.get(currentIndex)).data('top');
				var moveDistance = 0,
			          showIndex = 0,
			          hideIndex = 0;

			    if(moveDistanceY<0){
					showIndex = currentIndex+1;
					hideIndex = currentIndex;
					moveDistance = winH+currentTop;
				}else{
					showIndex = currentIndex;
					hideIndex = currentIndex+1;
					moveDistance = currentTop;
				}
			    if(showIndex >= items.length){
			    	showIndex = 0;
			    }
			    if(hideIndex >= items.length){
			    	hideIndex = 0;
			    }

		        // 4 => 1
		        move(moveDistance, 300, function(){
		        	options.callback(showIndex, hideIndex, items.get(showIndex), items.get(hideIndex));
		        });
		        
			});

			//移动
			var move = function(distance, duration, callback){
				duration = duration || 0;
				var easing = duration > 0 ? 'ease-in-out' : 'linear';

				for(var i = 0 ; i < items.length ; i++){
			        var top = $(items.get(i)).data('top');
			        if( top<=0 && top>-winH){
			          currentIndex = i;
			          break;
			        }
			    }

			    var nextIndex = (currentIndex + 1)%items.length,
        			prevIndex = currentIndex-1<0 ? items.length-1 : currentIndex-1;

				var current = items.get(currentIndex),
					prev = items.get(prevIndex),
					next = items.get(nextIndex);

				var currentTop = $(current).data('top');

				if(moving){
			        return;
			    }

			    moving = true;

				$(current).animate({
					'-webkit-transform': 'translateY('+(currentTop-distance)+'px)',
					transform: 'translateY('+(currentTop-distance)+'px)'
				},duration,easing,function(){
					setTop(current,currentTop-distance);
					moving = false;
					if(typeof callback === 'function'){
						callback();
					}
				});
				$(prev).animate({
					'-webkit-transform': 'translateY('+(currentTop-distance-winH)+'px)',
					transform: 'translateY('+(currentTop-distance)+'px)'
				},duration,easing,function(){
					setTop(prev, currentTop-winH-distance);
				});
				$(next).animate({
					'-webkit-transform': 'translateY('+(currentTop-distance+winH)+'px)',
					transform: 'translateY('+(currentTop-distance)+'px)'
				},duration,easing,function(){
					setTop(next, currentTop+winH-distance);
				});

			};

		};

		var setTop = function(node,pos){
			$(node).css({
				'-webkit-transform': 'translateY('+pos+')',
				'transform': 'translateY('+pos+')'
			});
			$(node).data('top', pos);
      		return $(node);
		};
		var setPos = function(currentIndex,prevIndex,nextIndex){
	    	//初始化位置
			for(var i=0; i<items.length; i++){
				if(i === nextIndex){
					items.get(i).style.transform = 'translateY('+winH+'px)';
					setTop(items.get(i),winH);
				}else if(i === currentIndex){
					items.get(i).style.transform = 'translateY(0px)';
					setTop(items.get(i),0);
				}else{
					items.get(i).style.transform = 'translateY('+-winH+'px)';
					setTop(items.get(i),-winH);
				}
			}
		};

		init();
		
	};
})(Zepto);

$(function(){

	$('.wrap').fullSlide({
		callback: function(showIndex, hideIndex,currentItem,hideItem){
			// console.log(showIndex, hideIndex,currentItem,hideItem);
			$(hideItem).removeClass('animation');
			$(currentItem).addClass('animation');
		}
	});
	
});