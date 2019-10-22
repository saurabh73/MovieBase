const sql = require('mssql');
const { check, validationResult } = require('express-validator');
module.exports = {
	setup: function (app, db, sendResponse) {

		/**
		* Get All Genres from Database
		**/
		app.get('/api/genre', (req, res) => {
			const method = `${req.method}: Get Genres`;
			db.request().query('SELECT * FROM genre WHERE isActive = 1')
			.then(result => {
				const data = result.recordsets[0];
				if (data) {
					sendResponse(res, true, method, data);
				} else {
					sendResponse(res, false, method, null);
				}
			}).catch(err => {
				sendResponse(res, false, method, err);
			});
		});

		/**
		* Get Genre by id from Database
		**/
		app.get('/api/genre/:id', [
			check('id').isNumeric()
		], (req, res) => {
			const method = `${req.method}: Get Genre by ID`;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(422);
				sendResponse(res, false, method, errors.array() );
			} else {
				db.request()
					.input('id', sql.Int, req.params.id)
					.query('SELECT * FROM genre WHERE id = @id AND isActive = 1')
				.then(result => {
					const data = result.recordsets[0][0];
					if (data) {
						sendResponse(res, true, method, data);
					} else {
						sendResponse(res, false, method, null);
					}
				}).catch(err => {
					sendResponse(res, false, method, err);
				});
			}
			
		});

		/**
		* Create new Genre
		**/
		app.post('/api/genre',[
			check('name').exists().isString()
		], (req, res) => {
			const method = `${req.method}: Add new Genre`;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(422);
				sendResponse(res, false, method, errors.array() );
			} else {
				db.request()
					.input('name', sql.VarChar, req.body.name)
					.query('INSERT INTO genre (name) VALUES (@name)')
				.then(result => {
					const success = result.rowsAffected[0] > 0;
					const data = result.recordsets[0][0];
					sendResponse(res, success, method, data);
				}).catch(err => {
					sendResponse(res, false, method, err);
				});
			}
		});

		/**
		* Update Genre
		**/
		app.put('/api/genre/:id',[
			check('name').isString(),
			check('id').isNumeric()
		], (req, res) => {
			const method = `${req.method}: Update Genre by ID`;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(422);
				sendResponse(res, false, method, errors.array() );
			} else {
				db.request()
					.input('name', sql.VarChar, req.body.name)
					.input('id', sql.Int, req.params.id)
					.query('UPDATE genre SET name = @name WHERE id = @id AND isActive = 1')
				.then(result => {
					console.log(result);
					const success = result.rowsAffected[0] > 0;
					sendResponse(res, success, method, undefined);
				}).catch(err => {
					sendResponse(res, false, method, err);
				});
			}	
		});

		/**
		*  Deactivate Genre
		**/
		app.delete('/api/genre/:id', [
			check('id').isNumeric()
		], (req, res) => {
			const method = `${req.method}: Delete Genre by ID`;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(422);
				sendResponse(res, false, method, errors.array() );
			} else {
				db.request()
					.input('id', sql.Int, req.params.id)
					.query('UPDATE genre SET isActive = 0 WHERE id = @id AND isActive = 1')
				.then(result => {
					const success = result.rowsAffected[0] > 0;
					sendResponse(res, success, method, undefined);
				}).catch(err => {
					sendResponse(res, false, method, err);
				});
			}
			
		});

		/**
		* Re-Activate Genre
		**/
		app.patch('/api/genre/:id/restore', [
			check('id').isNumeric()
		], (req, res) => {
			const method = `${req.method}: Restore deleted Genre by ID`;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(422);
				sendResponse(res, false, method, errors.array() );
			} else {
				db.request()
					.input('id', sql.Int, req.params.id)
					.query('update genre set isActive = 1 where id = @id and isActive = 0')
				.then(result => {
					const success = result.rowsAffected[0] > 0;
					sendResponse(res, success, method, undefined);
				}).catch(err => {
					sendResponse(res, false, method, err);
				});
			}
		});
	}
};