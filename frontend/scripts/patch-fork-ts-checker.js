// Stubs out fork-ts-checker-webpack-plugin so CRA's webpack config can load
// without crashing on its incompatible ajv-keywords. We don't use TypeScript,
// so a no-op plugin is safe.
const fs = require('fs');
const path = require('path');

const stub = `'use strict';
class NoopForkTsCheckerPlugin {
  constructor() {}
  apply() {}
}
module.exports = NoopForkTsCheckerPlugin;
module.exports.default = NoopForkTsCheckerPlugin;
`;

const targets = [
  'node_modules/react-dev-utils/ForkTsCheckerWebpackPlugin.js',
  'node_modules/react-dev-utils/ForkTsCheckerWarningWebpackPlugin.js',
];

for (const rel of targets) {
  const p = path.join(__dirname, '..', rel);
  try {
    if (fs.existsSync(p)) {
      fs.writeFileSync(p, stub);
      console.log('[patch] stubbed', rel);
    }
  } catch (e) {
    console.warn('[patch] skipped', rel, e.message);
  }
}
