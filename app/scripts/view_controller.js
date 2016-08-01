(function($){
	var namespaces = $.app.namespaces,
		todoManager = namespaces.managers.TodoManager,
		todoList = $('#todoList'),
		addTodoButton = $('a#addTodoButton'),
		addTodoText = $('#addTodoText'),
		filterButtons = $('.filter'),
		sortButtons = $('.sort'),
		deleteDoneButton = $('.delete-done');

	var drag = -1;

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
			this.deleteDoneFunction = _.bind(this.deleteDoneClicked, this);

			//
			this.editTodoFunction = _.bind(this.editTodoClicked, this);
			this.saveTodoFunction = _.bind(this.saveTodoClicked, this);

			addTodoButton.click(this.addTodoFunction);
			filterButtons.click(this.filterButtonFunction);
			sortButtons.click(this.sortButtonFunction);
			deleteDoneButton.click(this.deleteDoneFunction);

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

			todoManager.setSort(sort);
			this.refreshTodoList();
		},

		deleteDoneClicked: function(event) {
			todoManager.deleteDone();
			this.refreshTodoList();
		},

		editTodoClicked: function(event) {
			var target = $(event.currentTarget);
			var parent = target.parents('.todo');
			var index = parent.data('todoIndex');

			todoManager.editting = index;
			this.refreshTodoList();
		},

		saveTodoClicked: function(event) {
			var target = $(event.currentTarget);
			var parent = target.parents('.todo');
			var index = parent.data('todoIndex');
			
			todoManager.editTodo(index, $('#editTodoText').val());
			todoManager.editting = -1;
			this.refreshTodoList();
		},
		// ========


		refreshTodoList: function() {
			var todos = todoManager.getSavedTodos();
			var template = $('#todoTemplate').text();
			todoList.empty();

			//
			var editTemplate = $('#editTodoTemplate').text();

			todos = todos.map(function(e,i) {
				var obj = e;
				obj.index = i;
				return obj;
			});

			// Filter ==
			//
			switch(todoManager.filter) {
				case 'todo':
					todos = todos.filter(function(e) {return e.done === '';});
					break;
				case 'done':
					todos = todos.filter(function(e) {return e.done === 'todo-done';});
					break;
			}
			// ==

			// Sort ==
			//
			var sortFunction;
			switch(todoManager.sort) {
				case 'alpha':
					sortFunction = function(a,b) {
						if(a.text > b.text) return 1;
						if(a.text < b.text) return -1;
						return 0;
					};
					break;
				case 'r-alpha':
					sortFunction = function(a,b) {
						if(a.text > b.text) return -1;
						if(a.text < b.text) return 1;
						return 0;
					};
					break;
				case 'todo':
					sortFunction = function(a,b) {
						if(a.done === 'todo-done' && b.done === '') return 1;
						if(b.done === 'todo-done' && a.done === '') return -1;
						return 0;
					};
					break;
				case 'done':
					sortFunction = function(a,b) {
						if(a.done === 'todo-done' && b.done === '') return -1;
						if(b.done === 'todo-done' && a.done === '') return 1;
						return 0;
					};
					break;
				default:
					sortFunction = function() {
						return 0;
					};
			};
			todos = todos.sort(sortFunction);
			// ==
			_.each(todos, function(todo) {
				if(todoManager.editting === todo.index) {
					this.createEditTodo(todo, todo.index, editTemplate);
				} else {
					this.createTodo(todo, todo.index, template);
				}
			}, this);
		},

		createTodo: function(todo, index, template) {
			var item = $(Mustache.render(template, todo));			
			item.data('todoIndex', index);

			var deleteButton = item.find('.delete-todo');
			deleteButton.click(this.deleteTodoFunction);

			var editButton = item.find('.edit-todo');
			editButton.click(this.editTodoFunction);

			var checkBox = item.find('input[type="checkbox"]');
			checkBox.click(this.checkboxFunction);			
			checkBox.prop('checked', todo.done === '' ? '' : 'checked');

			var todoClickarea = item.find('.todo-clickarea');
			todoClickarea.click(this.toggleTodoFunction);

			//
			var moveButton = item.find('.move-todo');

			if(todoManager.sort !== '' || todoManager.filter !== '') moveButton.hide();

			moveButton.mousedown(_.bind(function(event){
				event.preventDefault();
				//console.log('mousedown');
				//if(todoManager.sort === '')
				drag = index; 
			}, this));

			$(document).mouseup(_.bind(function(event){
				drag = -1;
			}, this));



			item.mouseover(_.bind(function(event){
				//console.log('index:', index, 'drag:', drag);

				if(drag > -1 && drag != index) {
					//console.log('SWAP:', index, drag);
					todoManager.swapTodos(index, drag);
					drag = index;
					this.refreshTodoList();
				}

			}, this));

			

			todoList.append(item);
		},

		createEditTodo: function(todo, index, template) {
			var item = $(Mustache.render(template, todo));			
			item.data('todoIndex', index);

			var saveButton = item.find('#saveTodoButton');
			saveButton.click(this.saveTodoFunction);

			todoList.append(item);

			var editTodoText = $('#editTodoText'); 

			editTodoText.focus();
			var tempText = editTodoText.val()
			editTodoText.val('');
			editTodoText.val(tempText);

			editTodoText.keydown(function(evt) {
				if(evt.which == 13)
				{
					saveButton.click();
					return false;
				}
			});
		}
	};

	$.app.register('controllers.MainViewController', MainViewController);

})(jQuery);
