import expect from 'expect';

import { jsdom, createVirtualConsole } from 'jsdom';
import path from 'path';
import { transformFileSync } from 'babel-core';

import fs from 'fs';

const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'));
global.document = jsdom(html);
global.window = document.defaultView;

before(function(done) {
  const src = path.resolve(__dirname, '..', './src/index.js');
  const babelResult = transformFileSync(src, {
    presets: ['es2015']
  });
  const html = path.resolve(__dirname, '..', '/index.html');

  jsdom.env(html, [], {
    src: babelResult.code,
    // virtualConsole: createVirtualConsole().sendTo(console)
  }, (err, window) => {
    if (err) {
      return done(err);
    }

    return done();
  });
});
