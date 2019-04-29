
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
      },
      {
        test: /\.(scss)$/,
        use: [
          { loader: "style-loader" },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: { plugins: () => [ require('autoprefixer') ] }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(ttf|eot|png|gif|jpg|woff|woff2|svg|wav)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'url-loader', options: { limit: 8192 } }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [Path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      assets: Path.join(__dirname, 'src/assets')
    }
  },
  devServer: {
    inline: true,
    hot: true,
    historyApiFallback: true,
    port: 8787
  },
  plugins
}
