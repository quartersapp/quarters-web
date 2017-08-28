const webpack = require('webpack')
const merge = require('webpack-merge')

process.env.NODE_ENV = 'production' // set NODE_ENV for config import

const productionConfig = {
  output: {
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[file].map'
  },

  devtool: 'source-map',

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
    })
  ]
}

module.exports = merge.smart(require('./webpack.common.js'), productionConfig)
