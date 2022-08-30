const knex = require("knex");
const knexfile = require('./knexfile');
const {Model} = require('objection');

function setupDb() {
    let db;
    console.log('process.env.NODE_ENV ', process.env.NODE_ENV);

    if (process.env.NODE_ENV === 'production') {
        db = knex(knexfile.production);
    }
    else {
        db = knex(knexfile.development);
    }

        

    Model.knex(db);
}

module.exports = setupDb;