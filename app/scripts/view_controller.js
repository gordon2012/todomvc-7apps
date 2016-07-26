(function($){
	var namespaces = $.app.namespaces,
		todoManager = namespaces.managers.TodoManager,
		todoList = $('#todoList'),
		addTodoButton = $('a#addTodoButton'),
		addTodoText = $('#addTodoText'),
		filterButtons = $('.filter');
		sortButtons = $('.sort');

	var MainViewController = {

		// ========
		// Initialization
		//
		initialize: function() {
			this.configureListeners();

			addTodoText.focus();
		},

		configureListeners: function() {
			this.addTodoFunction = _.bind(this.addTodoClicked, this);
			this.deleteTodoFunction = _.bind(this.deleteTodoClicked, this);
			this.checkboxFunction = _.bind(this.checkboxClicked, this);
			this.toggleTodoFunction = _.bind(this.toggleTodoClicked, this);
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
		// ========


		// ========
		// Event Handlers
		//
		addTodoClicked: function(event) {
			todoManager.saveTodo(addTodoText.val());
			this.refreshTodoList();
			addTodoText.val('');
		},

		deleteTodoClicked: function(event) {
			var target = $(event.currentTarget);
			var parent = target.parents('.todo');
			var index = parent.data('todoIndex');
			
			todoManager.deleteTodo(index);
			this.refreshTodoList();
		},

		checkboxClicked: function(event) {
			event.preventDefault();
		},

		toggleTodoClicked: function(event) {
			var target = $(event.currentTarget);
			var parent = target.parents('.todo');
			var index = parent.data('todoIndex');

			todoManager.toggleTodo(index);
			this.refreshTodoList();
		},

		filterButtonClicked: function(event) {
			filterButtons.removeClass('btn-primary').addClass('btn-default');
			var target = $(event.target);
			target.removeClass('btn-default').addClass('btn-primary');

			var filter = target.hasClass('filter-todo') ? 'todo' : (target.hasClass('filter-done') ? 'done' : '' ); 
			todoManager.setFilter(filter);
			this.refreshTodoList();
		},

		sortButtonClicked: function(event) {
			sortButtons.removeClass('btn-primary').addClass('btn-default');
			var target = $(event.target);
			target.removeClass('btn-default').addClass('btn-primary');

			var sort = '';
			_.each(['alpha', 'r-alpha', 'todo', 'done'], function(e, i){
				sort = target.hasClass('sort-' + e) ? e : sort;
			}, this);

			//console.log(sort);
			// TODO: fix index error on delete

			todoManager.setSort(sort);
			this.refreshTodoList();




		},
		// ========


		refreshTodoList: function() {
			var todos = todoManager.getSavedTodos(),
				template = $('#todoTemplate').text();
			todoList.empty();

			_.each(todos, function(todo, index){
				this.createTodo(todo, index, template);
			}, this);
		},

		createTodo: function(todo, index, template) {
			var item = $(Mustache.render(template, todo));			
			item.data('todoIndex', index);

			var deleteButton = item.find('.delete-todo');
			deleteButton.click(this.deleteTodoFunction);

			var checkBox = item.find('input[type="checkbox"]');
			checkBox.click(this.checkboxFunction);			
			checkBox.prop('checked', todo.done === '' ? '' : 'checked');

			var todoClickarea = item.find('.todo-clickarea');
			todoClickarea.click(this.toggleTodoFunction);

			todoList.append(item);
		},
	};

	$.app.register('controllers.MainViewController', MainViewController);

})(jQuery);
