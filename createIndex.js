const client = require('./elastic');

const body = {
    'mappings': {
        'name': {
            'properties' :{
                'id': { 'type': 'integer' },
                'first_name': { 'type': 'string' },
                'last_name': { 'type': 'string' },
                'age': { 'type': 'integer' }
            }
        }
    }
}

const createMapping = () => client.indices.create({
    index: 'testing-user',
    body: body
}, function(err, resp, status) {
    if(err) {
        console.log('error create elastic or already created');
    } else {
        console.log(resp, 'Success');
    }
});

module.exports = createMapping;