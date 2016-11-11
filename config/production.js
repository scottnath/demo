'use strict';

const postgres = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

module.exports = {
  knex: {
    dialect: 'pg',
    connection: {
      host: postgres.host,
      user: postgres.user,
      password: postgres.password,
      database: postgres.name,
      port: postgres.port,
    },
    debug: false,
    acquireConnectionTimeout: 5000,
  },
  env: {
    port: process.env.PORT || 3000,
  },
};
