var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  cache: true,
  debug: true,
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist', 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([{ from: 'index.html', to: '../index.html' }])
  ],

  module: {
    loaders: [
      {
        test: require.resolve('vega'),
        loaders: [
          'transform?vega/scripts/strip-schema.js',
          'transform?browserify-versionify' // add this in if you want the vega version to be in the vega object.
        ]
      },
      { include: /\.js$/, loaders: ['react-hot', 'babel-loader?stage=1&optional=runtime'], exclude: /node_modules/}
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  }
};
