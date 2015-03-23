

$(function(){

  (function(){
    var aLi = $('.staff li');
    var aLiCon = $('.introduction');
    var aIco = $('.ico');
    aLiCon.hover(function(){
      var index = aLiCon.index(this);
      aLi.eq(index).attr('class','active');

      setCss(aIco.eq(index+1).find('span').eq(0)[0],{$Transform:"scale(1.5)"});
      setCss(aIco.eq(index+1).find('span').eq(1)[0],{$Transform:"scale(1.5)"});

      $(this).parent().find('span').css('font-size', '14px');
      $(this).parent().next().find('span').css('font-size', '14px');
      $(this).css('background', '#83B1D2');
    }, function(){
    var index = aLiCon.index(this);
      aLi.eq(index).attr('class','');

    setCss(aIco.eq(index+1).find('span').eq(0)[0],{$Transform:"scale(1)"});
      setCss(aIco.eq(index+1).find('span').eq(1)[0],{$Transform:"scale(1)"});

      $(this).parent().find('span').css('font-size', '');
      $(this).parent().next().find('span').css('font-size', '');
      $(this).css('background', '');
    });
  })();

  var oMain = $("#main")[0], aPage = $(".page"),
      innerWidth = $(window).innerWidth(),
      innerHeight = $(window).innerHeight(),
      iStartWidth = 1200,
      iStartHeight = 620,
      page = 0, iS = 0;

  resize();

  $('#menu li').on('click',function(){
    if( $('#main:animated').length )return;
    page = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('#main:not(:animated)').animate({top: -innerHeight*$(this).index()},800,'easeInOutExpo');
  });

  $('.ball').on('click',function(){
    var oBall = $('.pricePopup').eq($(this).index('.ball'));
    $(oBall).animate({top: ($('#price .wrap').innerHeight() - $(oBall).outerHeight())/2,opacity: 1});
  });

  $(document).on('mousewheel',function(event,delta){
    var iTop = Math.round($('#main').offset().top),speed = delta < 0 ? -1 : 1;
    if( $('#main:animated').length || page==4&&speed<0  )return false;
    if(((speed+1)&&!iTop)||(!(speed+1)&&iTop<=-innerHeight*4))return false;
    $('#main:not(:animated)').animate({top: '+='+(innerHeight*speed)+'px'},800,'easeInOutExpo',function(){
      page = Math.abs( Math.round($('#main').position().top) / innerHeight );
      $('#menu li').removeClass('active').eq(page).addClass('active');
    });
    return false;
  });


  $(window).on('resize load',function(ev){
    innerHeight = $(window).innerHeight(), innerWidth = $(window).innerWidth();  
    $('#main').stop(true).css({top: -innerHeight*page});
    $('#menu').css({top: (innerHeight - $('#menu').outerHeight()) / 2});
    if(ev.type == 'resize')resize();
  });

  $('.courseL li').css({width: $('.courseL li').parent().outerWidth() - 20});
  $('.courseR li').css({width: $('.courseR li').parent().outerWidth() - 20});

  $('.courseL li').css({height: (innerHeight-360*(iS*0.6||1))/3}).on('mouseover',function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.courseR li').removeClass('active').eq($(this).index()).addClass('active');
  });

  $('.courseList').css({height: $('.courseL li').outerHeight()*3}); 

  $('.priceCols').on('click',function(){
    $(this).parent().stop(true).animate({top:-1000,opacity: 0});
  });

  $('.courseR li').each(function(i,o){
    fnScrollBar(
      $(o).find('.bar'),
      $(o).find('.priceScrollBar'),
      $(o).find('div:first'),
      o,
      $(o).index($('.courseR li'))
    );
  });

  fnScrollBar(
    $('#askFor .bar'),
    $('#askFor .priceScrollBar'),
    $('#askFor .priceScroll div:first'),
    $('#askFor .priceScroll')
  );

  function fnScrollBar(bar,barParent,scroll,scrollParent, hide){

    scroll.parent().addClass('active');
    var viewH = $(scrollParent).innerHeight(),
      scrollH = $(scroll).outerHeight(),
      scrollBoxH = $(barParent).innerHeight(),
      barH = Math.round(viewH/scrollH*scrollBoxH),
      maxTop = viewH - scrollH, iTop = 0,scale = 0,
      maxH = scrollBoxH - barH;

    hide && scroll.parent().removeClass('active');

    if(barH >= scrollBoxH){$(barParent).hide();return false;}
    $(bar).css({height:barH});

    $(bar).on('mousedown',function(ev){
      var disY = ev.clientY - $(this).position().top;
      $(document).on('mousemove',function(ev){
        iTop = ev.clientY - disY;
        if( iTop < 0 || iTop > maxH )iTop = iTop < 0 ?  0: maxH;
        scale = iTop / maxH;
        $(bar).css({top : iTop});
        $(scroll).css({top : maxTop*scale});
      });
      $(document).on('mouseup',function(){
        $(document).off('mousemove mouseup');
      });
      return false;
    });

    $(scrollParent).on('mousewheel',function(event,delta){
      iTop -= delta*15;
      if( iTop < 0 || iTop > maxH )iTop = iTop < 0 ?  0: maxH;
      scale = iTop / maxH;
      $(bar).css({top : iTop});
      $(scroll).css({top : maxTop*scale});
      return false;
    });

  }

  function resize()
  {
    var iW=0,iL=0,iT=0,iH=0;

    if(innerWidth>iStartWidth && innerHeight>iStartHeight){
      setCss(oMain,{width:innerWidth,height:innerHeight,$Transform:"scale(1)",left:0});
    }else{

      if(innerWidth/iStartWidth>innerHeight/iStartHeight){
        iS=innerHeight/iStartHeight;
        iW=innerWidth/(innerHeight/iStartHeight);
        iH=iStartHeight;
      }else{
        iS=innerWidth/iStartWidth;
        iW=iStartWidth;
        iH=innerHeight/(innerWidth/iStartWidth);
      }
      iL=(innerWidth-iW)/2;
      setCss(oMain,{width:iW,height:iH,left:iL,$Transform:"scale("+iS+")"});
    }
    
  }

});

function setCss(obj,attr)
{
  var arr=["Webkit","Moz","O","ms",""];

  $.each(attr,function(s,v){

    if(s.charAt() == '$'){
      $.each(arr,function(i,e){
        $(obj).css(e+s.substring(1),v);
      });
      return;
    }

    if(s == 'rotate'){

      var a=Math.cos(v/180*Math.PI), b=Math.sin(v/180*Math.PI),
        c=-Math.sin(v/180*Math.PI), d=Math.cos(v/180*Math.PI);

      $.each(arr,function(i,e){
        $(obj).css(e+'Transform',"matrix("+a+","+b+","+c+","+d+","+0+","+0+")");
      });

      $(obj).css('filter',"progid:DXImageTransform.Microsoft.Matrix( M11="+a+", M12="+c+", M21="+b+", M22="+d+",SizingMethod='auto expand')");

      return;
    }

    $(obj).css(s,v);

  });

}

