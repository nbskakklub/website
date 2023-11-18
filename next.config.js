const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  output: 'export',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          type: "json",
          use: "yaml-loader",
        },
        {
          test: /\.svg$/,
          use: "@svgr/webpack",
        },
        {
          test: /\.(sc|c|sa)ss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
              },
            },
            // You have to put in after `css-loader` and before any `pre-precessing loader`
            { loader: 'scoped-css-loader' },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ]
    );
    return config;
  },
  experimental: {
    webpackBuildWorker: true,
  },
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.js',
    domains: ["imagedelivery.net"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
});
