const mysql = require('mysql');
const {db_config} = require("./config.json")
const database =db_config
database.database = "myhobbay"

const connect = () => {
    const conn = mysql.createConnection(database);
    conn.connect((err) => {
        if (err) throw err;
        console.log('Mysql Connected...');
    });
    return conn
}

module.exports = {
    connect
}