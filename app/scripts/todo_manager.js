(function($){
	var TodoManager = {
		savedTodos: [],
		filter: '',
		sort: '',
		editting: -1,

		saveTodo: function(text) {
			this.savedTodos.push({text: text, done: ''});
		},

		getSavedTodos: function() {
			return [].concat(this.savedTodos);
		},

		deleteTodo: function(index) {
			this.savedTodos.splice(index, 1);
		},

		deleteDone: function() {
			this.savedTodos = this.savedTodos.filter(function(e){return e.done === '' ? true : false});
		},

		toggleTodo: function(index) {
			this.savedTodos[index].done = this.savedTodos[index].done === '' ? 'todo-done' : ''; 
		},

		setFilter: function(filter) {
			this.filter = filter;
		},

		setSort: function(sort) {
			this.sort = sort;
		},

		editTodo: function(index, text) {
			this.savedTodos[index].text = text;
		}
	};

	$.app.register('managers.TodoManager', TodoManager);
})(jQuery);
