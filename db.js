const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital_management_system'  // make sure this database exists
});

connection.connect((err) => {
    if (err){
        console.log('error connecting to database', err);
    };
    console.log('Connected to MySQL database.');
});

module.exports = connection;
