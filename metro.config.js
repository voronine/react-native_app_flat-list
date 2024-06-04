const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      'png',
      'jpg',
      'jpeg',
      'svg',
    ],
    sourceExts: [
      ...defaultConfig.resolver.sourceExts,
      'js',
      'jsx',
      'ts',
      'tsx',
    ],
  },
};

module.exports = mergeConfig(defaultConfig, config);
