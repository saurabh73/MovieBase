module.exports = {
	setup: function (app, db, sendResponse) {

		/**
		* Get All Movies from Database
		**/
		app.get('/api/movies', (req, res) => {
			//ToDo	
		});

		/**
		* Get Movie by id from Database
		**/
		app.get('/api/movie/:id', (req, res) => {
			//ToDo	
		});

		/**
		* Create new Movie
		**/
		app.post('/api/movie', (req, res) => {
			//ToDo	
		});

		/**
		* Update Movie
		**/
		app.put('/api/movie/:id', (req, res) => {
			//ToDo	
		});
	}
};