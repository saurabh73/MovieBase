module.exports = {
	setup: function (app, db, sendResponse) {

		/**
		* Get All Generes from Database
		**/
		app.get('/api/genre', (req, res) => {
			//ToDo	
		});

		/**
		* Get Book by id from Database
		**/
		app.get('/api/genre/:id', (req, res) => {
			//ToDo	
		});

		/**
		* Create new Book
		**/
		app.post('/api/genre', (req, res) => {
			//ToDo	
		});

		/**
		* Update Book
		**/
		app.put('/api/genre/:id', (req, res) => {
			//ToDo	
		});
	}
};