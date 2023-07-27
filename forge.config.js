const path = require('node:path')
const fs = require('node:fs')

module.exports = {
  packagerConfig: {
    ignore: ["packages", ".data"],
    asar: true,
  },
  hooks: {
    postPackage: async (config, pkg) => {
      const buildPath = pkg.outputPaths[0]
      const binSrc = path.join(__dirname, 'bin');
      const dataSrc = path.join(__dirname, '.data');

      fs.cpSync(binSrc, path.join(buildPath, 'bin'), {recursive: true});
      fs.cpSync(dataSrc, path.join(buildPath, '.data'), {recursive: true});
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
