const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
  entry: './src/main',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "./main_[contenthash].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      remotes: {
        app1: 'app1@http://localhost:8081/remoteEntry.js'
      },
      exposes: {
        './Footer': './src/footer'
      }
    }),
  ],
  devServer: {
    port: 8082
  }
}