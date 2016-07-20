(function($){

	var namespaces = $.app.namespaces,
		todoManager = namespaces.managers.TodoManager,
		todoList = $('#todoList'),
		addTodoButton = $('a#addTodoButton'),
		addTodoText = $('#addTodoText'),
		filterButtons = $('.filter');
		sortButtons = $('.sort');


	var MainViewController = {
		initialize: function() {
			this.configureListeners();

			addTodoText.focus();
		},

		configureListeners: function() {
			this.addTodoFunction = _.bind(this.addTodoClicked, this);
			this.deleteTodoFunction = _.bind(this.deleteTodoClicked, this);
			this.filterButtonFunction = _.bind(this.filterButtonClicked, this);
			this.sortButtonFunction = _.bind(this.sortButtonClicked, this);

			addTodoButton.click(this.addTodoFunction);
			filterButtons.click(this.filterButtonFunction);
			sortButtons.click(this.sortButtonFunction);

			addTodoText.keydown(function(evt) {
				if(evt.which == 13)
				{
					addTodoButton.click();
					return false;
				}
			});
			
		},

		addTodoClicked: function(event) {
			todoManager.saveTodo(addTodoText.val());
			this.refreshTodoList();
			addTodoText.val('');
		},

		filterButtonClicked: function(event) {
			filterButtons.removeClass('btn-primary').addClass('btn-default');
			$(event.target).removeClass('btn-default').addClass('btn-primary');
		},

		sortButtonClicked: function(event) {
			sortButtons.removeClass('btn-primary').addClass('btn-default');
			$(event.target).removeClass('btn-default').addClass('btn-primary');
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
