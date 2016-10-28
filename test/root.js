import expect from 'expect';

import jsdom from 'jsdom';
import path from 'path';
import { transformFileSync } from 'babel-core';

// import babel from 'babel-core'
// const jsdom = require('jsdom');
// const path = require('path');

import fs from 'fs';

const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'));
// const exposedProperties = ['window', 'navigator', 'document'];
//
global.document = jsdom.jsdom(html);
global.window = document.defaultView;
// global.navigator = {
//   userAgent: 'node.js'
// };


before(function(done) {
  const src = path.resolve(__dirname, '..', './src/index.js');
  const babelResult = transformFileSync(src, {
    presets: ['es2015']
  });
  const html = path.resolve(__dirname, '..', '/index.html');

  jsdom.env(html, [], {
    src: babelResult.code,
    virtualConsole: jsdom.createVirtualConsole().sendTo(console)
  }, (err, window) => {
    if (err) {
      return done(err);
    }

    return done();
  });
});
