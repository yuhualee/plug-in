var Pop = {};
Pop.showDialog = function(mask,dialog){
	mask.show();
	dialog.show();

};
Pop.closeDialog = function(mask,dialog) {
	mask.hide();
	dialog.hide();
};