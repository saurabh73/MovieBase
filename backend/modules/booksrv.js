module.exports = {
	setup: function (app, db, sendResponse) {

		/**
		* Get All Books from Database
		**/
		app.get('/api/book', (req, res) => {
			//ToDo	
		});

		/**
		* Get Book by id from Database
		**/
		app.get('/api/book/:id', (req, res) => {
			//ToDo	
		});

		/**
		* Create new Book
		**/
		app.post('/api/book', (req, res) => {
			//ToDo	
		});

		/**
		* Update Book
		**/
		app.put('/api/book/:id', (req, res) => {
			//ToDo	
		});
	}
};