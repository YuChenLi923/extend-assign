const path = require('path'),
      UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
      fileName = 'extend-assign.min',
      libraryName = 'eAssign';
module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          },
          output:{
            comments: false
          }
        },
        parallel: true
      })
    ]
  },
  target: 'node',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: fileName + '.js',
    library: libraryName,
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
};
