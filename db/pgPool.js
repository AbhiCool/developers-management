const pg = require('pg');

let pgPool;
if (process.env.NODE_ENV === 'production') {
    pgPool = new pg.Pool({
        host: 'ec2-63-35-156-160.eu-west-1.compute.amazonaws.com',
        user: 'cggbqggpvshadt',
        password: "5faeec88dce0e11d9a5e4a8e5ced88fb1c626bff175ee887646efcf3295c1dc6",
        database: "da9ntkv8ni75pv",
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        ssl: {
            rejectUnauthorized: false,
        },
    });
}
else {
    pgPool = new pg.Pool({
        host: 'localhost',
        user: 'postgres',
        password: "root",
        database: "developers_db",
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    });
}

module.exports = pgPool;
