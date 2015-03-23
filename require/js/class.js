define(function(){
    var allStudents = [];
        return {
            classId: "001",
            department: "computer",
            addToClass: function(student){
                allStudents.push(student);
            },
            getClassSize: function(){
                return allStudents.length;
            }
        };
});