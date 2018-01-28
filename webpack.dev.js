const webpack = require('webpack')
const merge = require('webpack-merge')
const { resolve } = require('path')

const mergeStrategy = {
  entry: 'prepend'
}

const developmentConfig = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080'
  ],

  devServer: {
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500
    }
  },

  plugins: [
    new webpack.NamedModulesPlugin()
  ]
}

module.exports = merge.strategy(mergeStrategy)(require('./webpack.common.js'), developmentConfig)
