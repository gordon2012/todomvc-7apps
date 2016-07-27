(function($){
	var TodoManager = {
		savedTodos: [],
		filter: '',
		sort: '',

		saveTodo: function(text) {
			this.savedTodos.push({text: text, done: ''});
		},

		getSavedTodos: function() {
			return [].concat(this.savedTodos);
		},

		deleteTodo: function(index) {
			this.savedTodos.splice(index, 1);
		},

		toggleTodo: function(index) {
			this.savedTodos[index].done = this.savedTodos[index].done === '' ? 'todo-done' : ''; 
		},

		setFilter: function(filter) {
			this.filter = filter;
		},

		setSort: function(sort) {
			this.sort = sort;
		}
	};

	$.app.register('managers.TodoManager', TodoManager);
})(jQuery);
