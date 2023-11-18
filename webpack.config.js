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
      // You have to put it after `css-loader` and before any `pre-precessing loader`
      { loader: 'scoped-css-loader' },
      {
        loader: 'sass-loader',
      },
    ],
  },