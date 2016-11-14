'use strict';

const build = (type, plugins) => {
  const b = {};

  if (Array.isArray(plugins)) {
    plugins.forEach(plugin => {
      if (typeof plugin[type] === 'object') {
        Object.keys(plugin[type]).forEach(item => {
          if (!b.hasOwnProperty(item)) {
            b[item] = plugin[type][item];
          }
        });
      }
    });
  }

  return b;
};

module.exports = {
  build,
};
