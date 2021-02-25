// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
//   mode: 'development',
//   entry: './src/index.ts',
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   devtool: 'inline-source-map',
//   devServer: {
//     contentBase: './dist',
//     hot: true,
//   },
//   plugins: [
//     new CleanWebpackPlugin({
//       cleanStaleWebpackAssets: false
//     }),
//     new HtmlWebpackPlugin({
//       title: 'ThreeJs Explode',
//     }),
//   ],
//   resolve: {
//     extensions: ['.ts','.js'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ["@babel/typescript", "@babel/preset-env"],
//             plugins: [
//               "@babel/proposal-class-properties",
//               "@babel/proposal-object-rest-spread",
//               '@babel/plugin-transform-runtime'
//             ]
//           }
//         }
//       }
//     ],
//   },
// };