const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
  dist: resolve(__dirname, 'dist'),
  src: resolve(__dirname, 'src'),
  public: resolve(__dirname, 'public')
}

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'babel-polyfill',
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: paths.dist,
    publicPath: '/'
  },

  context: paths.src,
  devtool: 'eval',

  devServer: {
    contentBase: paths.dist,
    publicPath: '/',
    historyApiFallback: true
  },

  resolve: {
    alias: {
      services: resolve(paths.src, 'services'),
      shared: resolve(paths.src, 'shared')
    }
  },

  module: {
    rules: [{
      test: /\.(js)$/,
      use: [
        'babel-loader'
      ],
      exclude: /node_modules/
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(paths.public, 'index.html')
    }),
    new webpack.NamedModulesPlugin()
  ]
}
