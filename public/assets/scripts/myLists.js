$(document).ready(function(){
	$("#addItem").on("click", runTaskModal);
	$("#addCategory").on("click", runListModal);
	$("#quickAddButton").on("click", addToQuickList);
	$(".importance").on("click", buttonDropdownActions);
	$(":checkbox").on("click", checkboxActions);
});

// BELOW SECTION NEEDS TO BE REWORKED

var addItemToList = function(itemName){
	$.post("/item/new", itemName)
		.then("RELOAD PAGE - INCLUDE NEW ITEM")
};

var createNewList = function(listName) {
    $.post("/list/new", listName)
   		.then("RELOAD PAGE- INCLUDE NEW LIST");
  }

// ABOVE SECTION NEEDS TO BE REWORKED


var runTaskModal = function(){
	$("#taskModal").modal('show');
	$("#addTask").on("click", function(){
		var newTask = $("#modalTaskInput").val().trim();
		var determineList = $("#listTitle h1").text()
		$("#taskModal").modal('hide');
		$("#modalTaskInput").val("");
		addItemToList({listed_item: newTask, task_active: true, task_imporance: 0})
	});
};

var runListModal = function(){
	$("#listModal").modal('show');
	$("#addList").on("click", function(){
		var newList = $("#modalListInput").val().trim();
		$("#listModal").modal('hide');
		$("#modalListInput").val("");
		createNewList({list_title: newList});
	});
};

var addToQuickList = function(){
	event.preventDefault();
	var newTask = $("#quickAddInput").val().trim();
	$("#quickAddInput").val("");
	// UPDATE DB AND SEND TO QUICK LIST PAGE
};

var buttonDropdownActions = function(){
	var importance = $(this).data("value");
	var idOfTask = $(this).data("ref");
	console.log(importance)
		// SEND TO DB THE NEW IMPORTANCE IN FOLLOWING SECTION
		if (importance <= 2) {
			// LOGIC FOR UPDATING THE IMPORTANCE AND CHANGING THE CLASS
		} else {
			$.ajax({
      			method: "DELETE",
      			url: "/item/" + idOfTask
    })
    .done(getAuthors);
  }
		// LOGIC FOR DELETING THE ITEM FROM DB
	}
}

var checkboxActions = function(){
	var checkboxValue = $(this).val();
	if (this.checked) {
		// UPDATE DB TO INACTIVE AND CHANGE CSS CLASS
	} else {
		// UPDATE DB TO ACTIVE AND CHANGE CSS CLASS
	}
}