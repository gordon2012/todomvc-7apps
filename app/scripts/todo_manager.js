(function($){
	var TodoManager = {
		savedTodos: [],
		filter = '',

		saveTodo: function(text) {
			this.savedTodos.push({text: text, done: ""});
		},

		getSavedTodos: function() {
			var todos = [].concat(this.savedTodos);
			return todos;
		},

		deleteTodo: function(index) {
			this.savedTodos.splice(index, 1);
		},

		toggleTodo: function(index) {
			this.savedTodos[index].done = this.savedTodos[index].done === '' ? 'todo-done' : ''; 
		}
	};

	$.app.register('managers.TodoManager', TodoManager);
})(jQuery);
