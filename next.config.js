const path = require('path')

const withExportImages = require("next-export-optimize-images");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withExportImages(withBundleAnalyzer({
  output: "export",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          type: "json",
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
  },
}));
