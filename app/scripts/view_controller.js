(function($){

	var namespaces = $.app.namespaces,
		todoManager = namespaces.managers.TodoManager,
		todoList = $('#todoList'),
		addTodoButton = $('a#addTodoButton'),
		addTodoText = $('#addTodoText');

	var MainViewController = {
		initialize: function() {
			this.configureListeners();
		},

		configureListeners: function() {
			this.addTodoFunction = _.bind(this.addTodoClicked, this);
			this.deleteTodoFunction = _.bind(this.deleteTodoClicked, this);

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

			_.each(todos, function(todo, index){
				this.createTodo(todo, index, template);
			}, this);
		},

		createTodo: function(todo, index, template) {
			var item = $(Mustache.render(template, todo)),
				deleteButton = item.find('.delete-todo');

			deleteButton.data('todoIndex', index);
			deleteButton.click(this.deleteTodoFunction);

			todoList.append(item);
		},

		deleteTodoClicked: function(event) {
			var target = $(event.currentTarget),
				index = target.data('todoIndex'),
				parent = target.parents('.todo');
			todoManager.deleteTodo(index);
			this.refreshTodoList();
		}
	};

	$.app.register('controllers.MainViewController', MainViewController);

})(jQuery);
