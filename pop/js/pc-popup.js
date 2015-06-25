$(function(){
	var Popup = {};

	Popup.dialog = function(opts){
		options = $.extend({
			title: '',
			template: '',
			showfooter: 'true',
	        cancel: function(){
	        },
	        success: function(){
	        },
	        init: function(){
	        }
		},opts);

		var dialog = $(
				'<div class="mask"><div class="dialog has-hd has-ft">'+
				'<div class="dialog-hd">'+
				'<div class="title">弹出窗口</div>'+
				'<span class="closeDialog">×</span></div>'+
				'<div class="dialog-bd"></div>'+
				'<div class="dialog-ft">'+
				'<button class="btn cancel-btn">取消</button>'+
				'<button class="btn submit-btn">确定</button>'+
				'</div></div></div>'
			);
		dialog.md = dialog.find('.dialog');
		dialog.hd = dialog.find('.dialog-hd');
		dialog.ft = dialog.find('.dialog-ft');
		dialog.bd = dialog.find('.dialog-bd');
		dialog.close = dialog.find('.close');
		dialog.cancel = dialog.find('.cancel-btn');
		dialog.submit = dialog.find('.submit-btn');

		var init = function(){
			setTitle();
			setFooter();
			setContent();
			dialog.appendTo('body');
			setClose();
			if(typeof options.init == 'function'){
				options.init(dialog.bd);
			}
			if(typeof options.cancel == 'function'){
				options.cancel(dialog.cancel);
			}
			if(typeof options.success == 'function'){
				options.success(dialog.submit);
			}
			
		};

		var setTitle = function(){
			if(!options.title){
				dialog.hd.remove();
				dialog.find('.dialog').removeClass('has-hd');
			}else{
				dialog.hd.find('.title').html(options.title);
				dialog.find('.closeDialog').on('click',function(){
					hide();
				});
			}
		};

		var setFooter = function(){
			if(!options.showfooter){
				dialog.ft.remove();
				dialog.find('.dialog').removeClass('has-ft');
			}else{

			}
		};

		var setContent = function(){
			if(options.template.indexOf('#') == 0 || options.template.indexOf('.') == 0){
				dialog.bd.append($(options.template));
			}else{
				dialog.bd.html(options.template);
			}
		};

		var setClose = function(){
			$(dialog).on('click',function(){
				hide();
			});
			$(dialog.md).on('click',function(){
				return false;
			});
		};

		var show = function(){
			dialog.show();
		}

		var hide = function(){
			dialog.hide();
		}

		this.show = show;
		this.hide = hide;

		init();
	}

	var popup = new Popup.dialog({
		title: '可以重新设计标题哦',
		showfooter: true,
		template: '#content',
		cancel: function(ele){
			ele.on('click',function(){
				popup.hide();
			});
		},
		success: function(ele){
			ele.on('click',function(){
				popup.hide();
				alert('你点击了确定按钮！');
			});
		},
		init: function(container){
			container.find('.close1').on('click',function(){
				popup.hide();
			});
		}
	});
	$('.showDialog').click(function(){
        popup.show();
    });
});
