require('dotenv').config();
const mysql = require('mysql2');

console.info('process.env.DATABASE_HOST', process.env.DATABASE_HOST);

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD
});

module.exports = pool.promise();