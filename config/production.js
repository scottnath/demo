'use strict';

module.exports = {
  knex: {
    dialect: 'pg',
    connection: process.env.DATABASE_URL,
    debug: false,
    acquireConnectionTimeout: 5000,
  },
  env: {
    port: process.env.PORT || 3000,
  },
};
