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
			var todos = todoManager.getSavedTodos(),
					template = $('#todoTemplate').text();
			todoList.empty();

			_.each(todos, function(todo){
				todoList.append($(Mustache.render(template, todo)));
			}, this);
		}
	};

	$.app.register('controllers.MainViewController', MainViewController);

})(jQuery);
