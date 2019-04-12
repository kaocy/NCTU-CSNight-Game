
const Path = require('path')

module.exports = {
  entry: Path.resolve(__dirname, 'src/main.js'),
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loaders: ['babel-loader'],
        include: Path.resolve(__dirname, 'src/')
      }
    ]
  }
}
