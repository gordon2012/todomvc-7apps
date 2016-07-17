(function($){

	var namespaces = $.app.namespaces,
			todoList = $('#todoList');
			addTodoButton = $('a#addTodoButton'),
			addTodoText = $('#addTodoText');

	var MainViewController = {
		initialize: function() {
			// do stuff
			//

			this.addTodoFunction = _.bind(this.addTodoClicked, this);
			addTodoButton.click(this.addTodoFunction);

		},

		addTodoClicked: function() {
			alert('AddTodo clicked');
		}

	};

	$.app.register('controllers.MainViewController', MainViewController);

})(jQuery);
