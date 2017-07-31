'use strict';

const config = require('punchcard-cms/config/default');
const path = require('path');

config.content.directory = path.join(__dirname, '../content-types');
config.content.plugins = {
  directory: [path.join(__dirname, '../input-plugins')],
};

config.workflows.directory = path.join(__dirname, '../workflows');

config.env = config.env || {};
config.env.port = process.env.PORT || 3000;

module.exports = config;
