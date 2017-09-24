const { resolve } = require('path')
const { writeFileSync } = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const config = require('config')

const configPath = resolve(__dirname, 'config.json')
writeFileSync(configPath, JSON.stringify(config))

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
      config: configPath,
      common: resolve(paths.src, 'common'),
      core: resolve(paths.src, 'core')
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
    new EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development'
    })
  ]
}
