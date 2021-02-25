const path = require('path');
const zopfli = require('@gfx/zopfli');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: '[contenthash].[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      test: /\.js(\?.*)?$/i,
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      },
      compressionOptions: { 
        numiterations: 15,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'ThreeJs Explode',
    }),
  ],
  resolve: {
    extensions: ['.ts','.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/typescript", "@babel/preset-env"],
            plugins: [
              "@babel/proposal-class-properties",
              "@babel/proposal-object-rest-spread",
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      }
    ],
  },
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: 'all',
        }
      }
    }
  }
};