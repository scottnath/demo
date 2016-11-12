'use strict';

/**
 * @fileoverview Punchcard CMS Demo
 */
const punchcard = require('punchcard-cms');
const config = require('config');

const application = () => {
  return punchcard();
};

/*
  @description run the server if and only if this file is being run directly. Ignoring from code coverage as it's not possible to actually cover these lines.
 */
/* istanbul ignore next */
if (!module.parent) {
  application.then(app => {
    app.listen(config.env.port, () => {
      // Mean to console.log out, so disabling
      console.log(`Server starting on ${config.env.url}`); // eslint-disable-line no-console
    });
  }).catch(e => {
    // Mean to console.log out, so disabling
    console.error(e.stack); // eslint-disable-line no-console
  });
}

module.exports = application;
