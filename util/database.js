const mysql = require('mysql2');

/*const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'deepspa',
    password: 'Minhhanoi213@!#'
});*/

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'deepspa_swiss',
    password: 'Minhinria213@!#'
});

/*pool.on('connection', function (connection) {
    console.log('DB Connection established');
  
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });
});*/

module.exports = pool.promise();
