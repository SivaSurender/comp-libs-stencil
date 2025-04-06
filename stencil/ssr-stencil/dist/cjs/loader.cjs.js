'use strict';

var index = require('./index-BVeJKAMz.js');
var appGlobals = require('./app-globals-V2Kpy_OQ.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
//# sourceMappingURL=loader.cjs.js.map

//# sourceMappingURL=loader.cjs.js.map