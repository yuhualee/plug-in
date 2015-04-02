/* jshint node:true */
'use strict';

/*global $:false, Swipe:false, $:false, Zepto:false */


;(function(){
	var mySwipe = new Swipe(document.getElementById('swipeSlide'), {
	    speed: 400,
	    auto: 3000,
	    continuous:true,
	    callback: function(index) {
	        $($('#point>i').removeClass('active').get(index)).addClass('active');
	    }
	});
	for(var i=0; i<$('.slide-ul li').length; i++){
		var str = $('<i />',{class:'icon-point'});
		$('.slide-point').append(str);
	}
	$('.slide-point i').eq(0).addClass('active');
	$('.slide-point i').each(function(i){
		$(this).tap(function(){
			mySwipe.slide(i);
		});
	});

	// tab
	$('.tab-hd-cell').on('tap',function(){
		var $this = $(this);
		$this.addClass('current').siblings().removeClass('current');
		$this.closest('.tab-hd').siblings('.tab-bd').children('.tab-bd-cell').hide().eq($(this).index()).show();
	});
	
})(Zepto);

