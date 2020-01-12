const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
var webpackConfig = {
  entry: {
    main: './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'src', 'dist'),
  },
  module: {
    rules: [{
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCSSExtractPlugin.loader, 'css-loader', 
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 4,
                // includePaths: ['absolute/path/a', 'absolute/path/b'],
              },
            },
          }
        ],
      },
    ]
  },
  // devServer: {
  //   writeToDisk: true
  // },
};
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
});
// create css file
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
});
webpackConfig.plugins = [
  htmlWebpackPlugin,
  miniCssExtractPlugin
];
module.exports = webpackConfig;