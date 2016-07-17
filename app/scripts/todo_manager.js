(function($){

	var TodoManager = {

		savedTodos: [],

		saveTodo: function(text) {
			this.savedTodos.push({text: text});
		},

		createTodosIn: function(list) {

			var todos = [].concat(this.savedTodos);

			_.each(todos, function(todo){
				var item = $("<li class='todo'>" + todo.text + "</li>");
				$(list).append(item);
			});
		}
	};

	$.app.register('managers.TodoManager', TodoManager);

})(jQuery);
