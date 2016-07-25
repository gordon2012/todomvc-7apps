(function($){
	var TodoManager = {
		savedTodos: [],
		filter: '',

		saveTodo: function(text) {
			this.savedTodos.push({text: text, done: ''});
		},

		getSavedTodos: function() {
			var todos;
			switch(this.filter) {
				case 'todo':
					todos = this.savedTodos.filter(function(e) {return e.done === '';});
					break;
				case 'done':
					todos = this.savedTodos.filter(function(e) {return e.done === 'todo-done';});
					break;

				default:
					todos = [].concat(this.savedTodos);
			}
			return todos;
		},

		deleteTodo: function(index) {
			this.savedTodos.splice(index, 1);
		},

		toggleTodo: function(index) {
			this.savedTodos[index].done = this.savedTodos[index].done === '' ? 'todo-done' : ''; 
		},

		setFilter: function(filter) {
			this.filter = filter;
		}
	};

	$.app.register('managers.TodoManager', TodoManager);
})(jQuery);
