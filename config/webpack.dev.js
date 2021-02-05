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
    // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
    // Enable devServer.historyApiFallback by setting it to true
    historyApiFallback: {
      index: 'index.html'
    },
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, '../src/styles/constants.scss')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html') // Tells webpack where to serve index.html from
    })
  ]
};

module.exports = merge(baseConfig, devConfig);
