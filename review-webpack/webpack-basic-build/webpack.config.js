const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name]@[chunkhash].js',
  },
  mode: 'development',
  devServer: {
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  module: {
    rules: [{
      test: /\.css/,
      use: ['style-loader', 'css-loader']
    }, {
      test: '/\.js/',
      use: [
        {
          loader: path.resolve('./src/loader/index.js')
        }
      ]
    }]
  }
}