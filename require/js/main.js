require.config({
	baseUrl: 'js',
	paths: {
		'jquery': 'jquery-1.9.1.min'
	}
});

require(["manager","jquery"],function(manager){
	manager.addNewStudent("lee","female");
	manager.addNewStudent("huxf","male");
	manager.addNewStudent("humh","female");
	console.log(manager.getMyClassSize());
});