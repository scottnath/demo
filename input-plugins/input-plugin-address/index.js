'use strict';

/*
 * Address Input Plugin
 */
const clone = require('lodash/cloneDeep');
const text = require('input-plugin-text');
const number = require('input-plugin-number');

const utils = require('../utils');

// Deep Clone existing input plugins
const street = clone(text);
const city = clone(text);
const state = clone(text);
const zipcode = clone(number);

// Get Validation and JavaScript
const plugins = [street, city, state, zipcode];
const validation = utils.build('validation', plugins);
const scripts = utils.build('scripts', plugins);

// Replace cloned generics with new names
street.inputs.text.label = 'Street';
street.inputs.text.placeholder = 'Street of address';
street.html = street.html.replace(/text\./g, 'street.');

city.inputs.text.label = 'City';
city.inputs.text.placeholder = 'City of address';
city.html = city.html.replace(/text\./g, 'city.');

state.inputs.text.label = 'State';
state.inputs.text.placeholder = 'State of address';
state.html = state.html.replace(/text\./g, 'state.');

zipcode.inputs.number.label = 'Zipcode';
zipcode.inputs.number.placeholder = 'Zipcode of address';
zipcode.html = zipcode.html.replace(/number\./g, 'zipcode.');

/*
 * Address Input Plugin
 */
module.exports = {
  name: 'Address',
  description: 'Address input plugin',
  validation,
  scripts,
  inputs: {
    street: street.inputs.text,
    city: city.inputs.text,
    state: state.inputs.text,
    zipcode: zipcode.inputs.number,
  },
  html: `
    <div class="form--field">${street.html}</div>
    <div class="form--field">${city.html}</div>
    <div class="form--field">${state.html}</div>
    <div class="form--field">${zipcode.html}</div>`,
};
