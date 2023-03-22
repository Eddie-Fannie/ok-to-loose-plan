const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 每次构建前清理/dist文件夹
  },
  devServer: {
    static: './dist',
    hot: true,
  },
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '复习vue2',
      template: './src/index.html'
    }),
    new VueLoaderPlugin(), // 请确保引入
  ],
}