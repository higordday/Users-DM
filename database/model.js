
const mysql = require('mysql2');

let mysql_connection = mysql.createConnection
({

    host     : process.env.DATABASE_SERVER_HOST,
    port     : process.env.DATABASE_SERVER_PORT,
    user     : process.env.DATABASE_AUTHENTICATION_CREDENTIAL_USERNAME,
    password : process.env.DATABASE_AUTHENTICATION_CREDENTIAL_PASSWORD,
    database : process.env.DATABASE_NAME

});

mysql_connection.connect();

module.exports = mysql_connection;