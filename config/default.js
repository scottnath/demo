'use strict';

const config = require('punchcard-cms/config/default');
const path = require('path');

config.content.directory = path.join(__dirname, '../content-types');
config.workflows.directory = path.join(__dirname, '../workflows');

module.exports = config;
