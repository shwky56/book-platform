import mysql from 'mysql2';

import * as dotenv from 'dotenv';
dotenv.config()


const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,

}).promise();


export default pool;

