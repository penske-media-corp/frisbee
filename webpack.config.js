const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? process.env.NODE_ENV : 'none',
  entry: './src/build.js',
  watch: !isProd,
  devtool: isProd ? undefined : 'inline-source-map',
  output: {
    filename: 'frisbee.' + (isProd ? 'min.' : '') + 'js'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      sourceMap: !isProd
    })
  ]
}
