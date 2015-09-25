var $ = function(id){
	return document.getElementById(id);
}

var addEvent = function(obj,event,fn){
	if(obj.addEventListener){
		obj.addEventListener(event,fn,false)
	}else if(obj.attachEvent){
		obj.attachEvent('on'+ event,fn);
	}
}
