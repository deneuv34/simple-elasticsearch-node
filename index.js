var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var client = require('./elastic');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adhitya00',
    database: 'testingexpress',
})

connection.connect();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/del', (req, res) => {
    connection.query(`delete from user_list`);
    res.json({ message: 'all data deleted' });
})

app.post('/add', (req, res) => {
    console.log(req.statusCode);
    connection.query(`insert into user_list (name_first, name_last, age) values ("${req.body.first_name}", "${req.body.last_name}", ${req.body.age})`)
    res.json({ request: req.body, message: 'Success' });
    client.indices.create({
        index: 'users-test',
        query: res.json(req.body)
    }, (err, respon, status) => {
        if(err) {
            console.log(err);
        } else {
            console.log(respon);
        }
    })
})


app.use('/users', (req, res) => {
    connection.query(`select * from user_list`, (error, result, fields) => {
        if (error) throw error;
        res.json({ message : 'Welcome to my world', data: result });
    });
    
})

app.listen(3000);