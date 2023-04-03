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
      name: 'app1',
      library: {
        type: 'var',
        name: 'app1'
      },
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/header'
      },
      remotes: {
        app2: 'app2@http://localhost:8082/remoteEntry.js'
      },
    }),
  ],
  devServer: {
    port: 8083
  }
}