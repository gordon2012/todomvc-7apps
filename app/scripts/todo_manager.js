(function($){
	var TodoManager = {
		savedTodos: [],
		filter: '',
		sort: '',

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

			todos.forEach(function(e){console.log(e.text)});
			console.log('====');
			if(this.sort === 'alpha') {
				//console.log(this.sort);
				todos = todos.sort(function(a,b){
					if(a.text > b.text) return 1;
					if(a.text < b.text) return -1;
					return 0;
				});
			}
			//console.log(todos.text);
			todos.forEach(function(e){console.log(e.text)});
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
		},

		setSort: function(sort) {
			this.sort = sort;
		}
	};

	$.app.register('managers.TodoManager', TodoManager);
})(jQuery);
