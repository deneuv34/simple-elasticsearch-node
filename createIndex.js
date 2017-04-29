const client = require('./elastic');


client.indices.create({
    index: 'users-test',
}, function(err, resp, status) {
    if(err) {
        console.log('error create elastic', err);
    } else {
        console.log(resp, 'Success');
    }
})