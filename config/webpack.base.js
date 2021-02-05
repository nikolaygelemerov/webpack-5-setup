module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Implemented in .babelrc in orded to handle server/main.js
            // presets: ['@babel/preset-env'],
            // plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: {
                list: [{ tag: 'img', attribute: 'src', type: 'src' }]
              }
            }
          }
        ]
      },
      {
        test: /\.(jpeg|jpg|gif|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(resourcePath) {
                const delimeter = '_' + Math.random().toString(36).substr(2, 9);
                const folders = resourcePath
                  .replace(/\\|\//g, delimeter)
                  .split(delimeter);

                const fileParentFolderName = folders[folders.length - 2];

                return `static/assets/${fileParentFolderName}/[name].[ext]`;
              }
            }
          }
        ]
      }
    ]
  }
};
