$(document).ready(function(){
	$("#addItem").on("click", runTaskModal);
	$("#addCategory").on("click", runListModal);
	$("#quickAddButton").on("click", addToQuickList);
});

var runTaskModal = function(){
	$("#taskModal").modal('show');
	$("#addTask").on("click", function(){
		var newTask = $("#modalTaskInput").val().trim();
		var determineList = $("#listTitle h1").text()
		$("#taskModal").modal('hide');
		$("#modalTaskInput").val("");
	});
};

var runListModal = function(){
	$("#listModal").modal('show');
	$("#addList").on("click", function(){
		console.log("clicked");
		var newList = $("#modalListInput").val().trim();
		console.log(newList);
		$("#listModal").modal('hide');
		$("#modalListInput").val("");
	});
};

var addToQuickList = function(){
	event.preventDefault();
	var newTask = $("#quickAddInput").val().trim();
	$("#quickAddInput").val("");
};