'use strict';

// Now lets get cfenv and ask it to parse the environment variable
const cfenv = require('cfenv');
const parse = require('pg-connection-string').parse;
const appenv = cfenv.getAppEnv();

// Within the application environment (appenv) there's a services object
const services = appenv.services;

// The services object is a map named by service so we extract the one for PostgreSQL
const pg_services = services['compose-for-postgresql'];

// We now take the first bound PostgreSQL service and extract it's credentials object
const credentials = pg_services[0].credentials;

// Within the credentials, an entry ca_certificate_base64 contains the SSL pinning key
// We convert that from a string into a Buffer entry in an array which we use when
// connecting.
const ca = new Buffer(credentials.ca_certificate_base64, 'base64');
const connectionString = credentials.uri;

module.exports = {
  knex: {
    dialect: 'pg',
    connection: parse(connectionString),
    debug: false,
    table: 'words',
    ssl: {
      rejectUnauthorized: false,
      ca: ca,
    },
  },
  env: {
    port: process.env.PORT || 3000,
  },
};
