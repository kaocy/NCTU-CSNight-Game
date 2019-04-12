
const Path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new WebpackNotifierPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: 'body'
  })
]

module.exports = {
  entry: Path.resolve(__dirname, 'src/main.js'),
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loaders: ['babel-loader'],
        include: Path.resolve(__dirname, 'src/')
      }
    ]
  },
  devServer: {
    inline: true,
    hot: true,
    historyApiFallback: true,
    port: 8787
  },
  plugins
}
