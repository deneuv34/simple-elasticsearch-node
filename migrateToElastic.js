const mysql = require('mysql');
const client = require('./elastic');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adhitya00',
    database: 'testingexpress',
})

connection.connect();

const indexAllData = connection.query('select * from user_list', (err, resp, status) => {
    if (err) { console.log('error or has created') }
    else {
        resp.map((data) => {
                client.create({
                index: 'testing-user',
                type: 'name',
                id: data.id,
                body: {
                    id: data.id,
                    name_first: String(data.name_first),
                    name_last: String(data.name_last),
                    age: data.age
                },
            });
        });   
    }
})

module.exports = indexAllData;

