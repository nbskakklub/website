const path = require('path')

const withExportImages = require('next-export-optimize-images')
const withAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withExportImages(
  withAnalyzer({
    output: 'export',
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
    experimental: {
      webpackBuildWorker: true,
      forceSwcTransforms: true,
    },
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    }
  })
);
