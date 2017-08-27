const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
  build: resolve(__dirname, 'build'),
  src: resolve(__dirname, 'src'),
  public: resolve(__dirname, 'public')
}

module.exports = {
  entry: [
    'babel-polyfill',
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: paths.build,
    publicPath: '/'
  },

  context: paths.src,
  devtool: 'eval',

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
    })
  ]
}
