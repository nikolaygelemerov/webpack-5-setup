const path = require('path');
const { merge } = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: '/' // Tels webpack where to serve public assets from (./public/index.html) related to base url
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    },
    open: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html') // Tells webpack where to serve index.html from
    })
  ]
};

module.exports = merge(baseConfig, devConfig);
