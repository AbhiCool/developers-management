// Update with your config settings.
const {knexSnakeCaseMappers} = require('objection');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'developers_db',
      user:     'postgres',
      password: 'root',
    },
    // connection: {
    //   database: 'developers_db',
    //   user:     'postgres',
    //   password: 'root'
    // },
    pool: {
      min: 2,
      max: 10
    },

    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    },
    ...knexSnakeCaseMappers
  },
  production: {
    client: 'postgresql',
    connection: {
      host: 'ec2-63-35-156-160.eu-west-1.compute.amazonaws.com',
      database: 'da9ntkv8ni75pv',
      user:     'cggbqggpvshadt',
      password: '5faeec88dce0e11d9a5e4a8e5ced88fb1c626bff175ee887646efcf3295c1dc6',
      ssl: {
        rejectUnauthorized: false,
      }
    },
    pool: {
      min: 2,
      max: 10
    },

    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    },
    ...knexSnakeCaseMappers
  }
};
