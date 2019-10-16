const express = require('express');

const booksrv = require('./backend/booksrv');
const genresrv = require('./backend/genresrv');
const hotlistsrv = require('./backend/hotlistsrv');
const moviesrv = require('./backend/moviesrv');
const statisticssrv = require('./backend/statisticssrv');
const typesrv = require('./backend/typerv');

const app = express();

//ToDo: Database MSSQL Server

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