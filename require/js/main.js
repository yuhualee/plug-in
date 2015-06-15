require.config({
	baseUrl: 'js',
	// paths: {
	// 	'jquery': 'jquery-1.9.1.min'
	// }
});

require(["selector"],function(query){
	var ele = query('.wraper');
	console.log(ele);
});