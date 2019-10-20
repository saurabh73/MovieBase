const express = require('express');
const colors = require('colors');

// Backend Modules
const booksrv = require('./modules/booksrv');
const genresrv = require('./modules/genresrv');
const hotlistsrv = require('./modules/hotlistsrv');
const moviesrv = require('./modules/moviesrv');
const statisticssrv = require('./modules/statisticssrv');
const typesrv = require('./modules/typesrv');

const app = express();

//ToDo: Database MSSQL Server

const db = {}
/*  Replace with MSSQL!!!
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'stuffbase'
});
*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get('/health', (req, res) => {
  sendResponse(res, true, "Healthy", null);
  console.log("Healthy");
});

const sendResponse = function (res, suc, mes, data) {
  if (suc) {
    console.log("NODE - SUCCESS " + mes);
  } else {
    console.log("NODE - ERROR " + mes);
  }
  res.json({ success: suc, message: mes, data: data });
};

//Server Setup here
moviesrv.setup(app, db, sendResponse);


app.listen(8081, function () {
  console.log("\n");
  console.log(colors.cyan("-----------------------------------------"));
  console.log(colors.cyan("App running now... (listening at port 8081)"));
  console.log(colors.cyan("-----------------------------------------"));
  console.log("\n");
});