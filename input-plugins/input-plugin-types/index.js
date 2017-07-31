'use strict';

/*
 * Address Input Plugin
 */
const clone = require('lodash/cloneDeep');
const reference = require('punchcard-cms/input-plugins/input-plugin-reference');

const utils = require('../utils');

// Deep Clone existing input plugins
const nature = clone(reference);
const party = clone(reference);

// make replacements in html
nature.html = nature.html.replace(/reference\./g, 'nature.');
party.html = party.html.replace(/reference\./g, 'party.');

// Get Validation and JavaScript
const plugins = [nature, party];
const validation = utils.build('validation', plugins);
const scripts = utils.build('scripts', plugins);

// Replace cloned generics with new names
nature.inputs.reference.settings.contentType = 'labels-options';

party.inputs.reference.settings.contentType = 'labels-options';

/*
 * Address Input Plugin
 */
module.exports = {
  name: 'Types',
  description: 'Select types',
  validation,
  scripts,
  inputs: {
    nature: nature.inputs.reference,
    party: party.inputs.reference,
  },
  html: `
    <div class="form--field">${nature.html}</div>
    <div class="form--field">${party.html}</div>`,
};
