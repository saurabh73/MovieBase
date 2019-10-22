const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

// Backend Modules
const booksrv = require('./modules/booksrv');
const genresrv = require('./modules/genresrv');
const hotlistsrv = require('./modules/hotlistsrv');
const moviesrv = require('./modules/moviesrv');
const statisticssrv = require('./modules/statisticssrv');
const typesrv = require('./modules/typesrv');

const app = express();

//ToDo: Database MSSQL Server
const dbConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: 'MovieBase',
  pool: {
      max: 20,
      min: 0,
      idleTimeoutMillis: 30000
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
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
    console.error("NODE - ERROR " + mes);
  }
  res.json({ success: suc, message: mes, data: data });
};


new sql.ConnectionPool(dbConfig).connect()
.then(pool => {
  moviesrv.setup(app, pool, sendResponse);
  genresrv.setup(app, pool, sendResponse);
});


app.listen(8081, function () {
  console.log("\n");
  console.log(colors.cyan("-----------------------------------------"));
  console.log(colors.cyan("App running now... (listening at port 8081)"));
  console.log(colors.cyan("-----------------------------------------"));
  console.log("\n");
});