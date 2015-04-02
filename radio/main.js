;(function($){
	$.fn.jCheckbox = function(settings){
		settings = jQuery.extend({
			wrapClass: 'radio',
			checkedClass: 'checked'
		},settings);

		return this.each(function(){
			var _that = $(this);

			if(_that.data('is-init-checkbox')) 
				return;
			_that.data('is-init-checkbox',true);

			var main = function(){
				wrapHtml();
				bindEvent();
			}

			var wrapHtml = function(){
				_that.wrap($('<span class="'+settings.wrapClass+'"></span>')).hide();
				// if(_that.prop('checked')){
				// 	_that.parent().addClass(settings.checkedClass);
				// }
				autoRender(_that);
			}

			var autoRender = function(node){
				if(!node.data('is-init-checkbox')) return;
				
				if(node.prop('checked')){
					node.parent().addClass(settings.checkedClass);
				}else{
					node.parent().removeClass(settings.checkedClass);
				}
			}

			var bindEvent = function(){
				_that.parent().click(function(){
					if($(this).children().prop('checked')){
						$(this).children().prop('checked',false);
					}else{
						$(this).children().prop('checked',true);
					}
					
					autoRender(_that);
					$('input[name='+_that.attr('name')+']').each(function(){
                        autoRender($(this));
					});
				});
			}

			main();
		});

	}
	
})(jQuery);