'use strict';

const config = require('punchcard-cms/config/default');
const path = require('path');
require('dotenv').config();

config.content.directory = path.join(__dirname, '../content-types');
config.content.plugins = {
  directory: [path.join(__dirname, '../input-plugins')],
};

config.workflows.directory = path.join(__dirname, '../workflows');

console.log('process.envprocess.envprocess.envprocess.envprocess.env');
console.log(process.env.AWS_ACCESS_KEY_ID);
const store = {
  s3: {
    type: 's3',
    dest: '',
    settings: {
      awsOptions: {
        Bucket: 'punchcard-bluemix',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAJJUJ4IRESBL3MDZQ',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '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',
        region: process.env.REGION || 'us-west-2',
        sslEnabled: true,
      }
    },
    public: 'https://s3.amazonaws.com/punchcard-bluemix/', // Can include {{dest}} for the dest path
    temp: {
      dest: 'public/tmp/',
      public: '/tmp',
    },
  },
  file: {
    type: 'fs',
    dest: 'public/files',
    settings: {},
    public: '/files', // Can include {{dest}} for the dest path
    temp: {
      dest: 'public/tmp/',
      public: '/tmp',
    },
  },
};

config.storage = store.s3;

module.exports = config;
