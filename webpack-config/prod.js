const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { find } = require('lodash')
const { resolve } = require('path')
const commonConfig = require('./common')

process.env.NODE_ENV = 'production' // set NODE_ENV for config import

const extractAppCss = new ExtractTextPlugin('app.[chunkhash].css')
const extractVendorCss = new ExtractTextPlugin('vendor.[chunkhash].css')

const productionConfig = {
  output: {
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[file].map'
  },

  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.scss$/,
      include: resolve(__dirname, '../src'),
      use: extractAppCss.extract({
        use: find(commonConfig.module.rules, rule => rule.test.test('.scss')).use
      })
    }, {
      test: /\.css$/,
      include: /node_modules/,
      use: extractVendorCss.extract({
        use: find(commonConfig.module.rules, rule => rule.test.test('.css')).use
      })
    }]
  },

  plugins: [
    // extract vendor modules to common bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    // minify bundles
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    extractAppCss,
    extractVendorCss
  ]
}

module.exports = merge.smart(require('./common.js'), productionConfig)
