const webpack = require('webpack')
const merge = require('webpack-merge')
const { resolve } = require('path')
const { find } = require('lodash')

const commonConfig = require('./common.js')

const mergeStrategy = {
  'entry': 'prepend'
}

const developmentConfig = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080'
  ],

  devServer: {
    contentBase: resolve(__dirname, '../build'),
    publicPath: '/',
    historyApiFallback: true
  },

  module: {
    rules: [{
      test: /\.scss$/,
      include: resolve(__dirname, '../src'),
      use: ['style-loader'].concat(
        find(commonConfig.module.rules, rule => rule.test.test('.scss')).use
      )
    }]
  },

  plugins: [
    new webpack.NamedModulesPlugin()
  ]
}

const config = merge.smartStrategy(mergeStrategy)(commonConfig, developmentConfig)

module.exports = config
