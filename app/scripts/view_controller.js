(function($){

	var namespaces = $.app.namespaces,

			todoManager = namespaces.managers.TodoManager,

			todoList = $('#todoList');

			addTodoButton = $('a#addTodoButton'),
			addTodoText = $('#addTodoText');

	var MainViewController = {
		initialize: function() {
			this.addTodoFunction = _.bind(this.addTodoClicked, this);
			addTodoButton.click(this.addTodoFunction);
		},

		addTodoClicked: function(event) {
			todoManager.saveTodo(addTodoText.val());
			this.refreshTodoList();
		},

		refreshTodoList: function() {
			todoList.empty();
			todoManager.createTodosIn(todoList);
		}
	};

	$.app.register('controllers.MainViewController', MainViewController);

})(jQuery);
