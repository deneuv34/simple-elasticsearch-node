var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var client = require('./elastic');
const createMapping = require('./createIndex');

// Connecting into database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adhitya00',
    database: 'testingexpress',
})

createMapping(); // Create elasticsearch mapping

connection.connect();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// delete all database instantly
app.get('/del', (req, res) => {
    connection.query(`delete from user_list`);
    res.json({ message: 'all data deleted' });
})

var jsonData = {};
const getData = () => {
    connection.query(`select * from user_list`, (error, result, fields) => {
        if (error) throw error;
        jsonData = JSON.parse(result);
    });
}

// Add data into database
app.post('/add', (req, res) => {
    console.log(req.statusCode);
    connection.query(`insert into user_list (name_first, name_last, age) values ("${req.body.first_name}", "${req.body.last_name}", ${req.body.age})`)
    res.json({ request: req.body, message: 'Success' });
});

// view all data from database
app.use('/users', (req, res) => {
    connection.query(`select * from user_list`, (error, result, fields) => {
        if (error) throw error;
        res.json({ message : 'Welcome to my world', data: result });
    });
})

app.listen(3000, console.log('Server is running'));