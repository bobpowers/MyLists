$(document).ready(function(){
	$("#addItem").on("click", runTaskModal);
	$("#addCategory").on("click", runListModal);
	$("#quickAddButton").on("click", addToQuickList);
	$(document).on('click', '.importance', buttonDropdownActions);
	$("#listTitle h1").text(titleText);
//	$(document).on("click", '.blankCheckbox', checkboxActions);
	$(".fa-angle-double-right").on('mousedown', function() {
		var grabInfoToDelete = function(){
			var listToDelete = $(this).data("value");
			// console.log(listToDelete);
			runListModal();
		};
    	var timeoutId = 0;
    	timeoutId = setTimeout(grabInfoToDelete, 1000);
		}).on('mouseup', function() {
    	clearTimeout(timeoutId);
	});

});

// BELOW SECTION NEEDS TO BE REWORKED

// var addItemToList = function(itemName){
// 	$.post("/item/new", itemName)
// 		.then("RELOAD PAGE - INCLUDE NEW ITEM")
// };

// var createNewList = function(listName) {
//     $.post("/list/new", listName)
//    		.then("RELOAD PAGE- INCLUDE NEW LIST");
//   }

// ABOVE SECTION NEEDS TO BE REWORKED

var titleText = function(){
	var listTitle = window.location.pathname;
	listTitle = listTitle.replace("lists", "").replace(/\//g, "").replace(/%20/g, " ");
	return listTitle
}


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
			$.ajax({
      			method: "PUT",
      			url: "list/item/" + idOfTask + "/" + importance,
				  success: function(){
					  console.log("Edited");
                      location.reload(); //this is the redirect
					}
    		})
		} else {
			$.ajax({
      			method: "DELETE",
      			url: "list/item/" + idOfTask,
				  success: function(){
					  console.log("Edited");
					  location.reload(); //this is the redirect
					}
    		})
  }
		// LOGIC FOR DELETING THE ITEM FROM DB
	}

$('input:checkbox').change(function() {
	var idOfTask = $(this).data("ref");
	if ($(this).prop('checked')) {
		$.ajax({
			method: "PUT",
			url: "list/item/active/" + idOfTask + "/" + 0,
			success: function(){
				console.log("Edited");
				location.reload(); //this is the redirect
			  }
	})
 } else {
		$.ajax({
			method: "PUT",
			url: "list/item/active/" + idOfTask + "/" + 1,
			success: function(){
				console.log("Edited");
				location.reload(); //this is the redirect
			  }
	})
}

})
getLists();
var authorList = $("tbody");
var authorContainer = $(".addedLists");

function createlistRow(listData) {
	var link = $("<div>");
		link.append("<a class='sidebarLinkref' href='" + listData.list_title + "'><i class='fa fa-angle-double-right' data-value="+listData.list_title+"></i> " + listData.list_title + "</a>")
		link.append("<br><hr class='hr'><br>")
	return link;
}

function getLists() {
	$.get("/api/lists", function(data) {
		var rowsToAdd = [];
		for (var i = 1; i < data.length; i++) {
		rowsToAdd.push(createlistRow(data[i]));
		}
		renderLists(rowsToAdd);
	});
	}
	

function renderLists(rows) {
	if (rows.length) {
		authorContainer.append(rows);
	}
	else {
		renderEmpty();
	}
	}
	
	
// 	<a href="#"><i class="fa fa-angle-double-right"></i> Template</a>
// 	<br><hr class="hr"><br>

//     newTr.data("author", authorData);
//     newTr.append("<td>" + authorData.name + "</td>");
//     newTr.append("<td># of posts will display when we learn joins in the next activity!</td>");
//     newTr.append("<td><a href='/blog?author_id=" + authorData.id + "'>Go to Posts</a></td>");
//     newTr.append("<td><a href='/cms?author_id=" + authorData.id + "'>Create a Post</a></td>");
//     newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
//     return newTr;
//   }
