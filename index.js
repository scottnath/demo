'use strict';

/**
 * @fileoverview Punchcard CMS Demo
 */
const punchcard = require('punchcard-cms');
const config = require('config');

punchcard().then(app => {
  app.listen(config.env.port, () => {
    // Mean to console.log out, so disabling
    console.log(`Server starting on ${config.env.url}`); // eslint-disable-line no-console
  });
}).catch(e => {
  console.log(e.stack);
});
