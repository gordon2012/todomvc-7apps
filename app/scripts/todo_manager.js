(function($){

	var TodoManager = {

		savedTodos: [],

		saveTodo: function(text) {
			this.savedTodos.push({text: text});
		},

		getSavedTodos: function() {
			var todos = [].concat(this.savedTodos);
			return todos;
		}
	};

	$.app.register('managers.TodoManager', TodoManager);

})(jQuery);
