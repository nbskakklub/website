const path = require('path')

const withExportImages = require('next-export-optimize-images')
const withAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withExportImages(
  withAnalyzer({
    output: 'export',
    turbopack: {
      rules: {
        '*.yml': {
          loaders: ['yaml-loader'],
          as: '*.js',
        },
        '*.yaml': {
          loaders: ['yaml-loader'],
          as: '*.js',
        },
      },
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push(
        ...[
          {
            test: /\.ya?ml$/,
            use: "yaml-loader",
          },
        ]
      );
      return config;
    },
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    }
  })
);
