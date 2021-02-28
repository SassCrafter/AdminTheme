const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    publicPath: 'dist',
    writeToDisk: true,
  },

  entry: './src/js/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: 'dist',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
                            postcssOptions: {
                                plugins: function() {
                                  return [
                                      require('autoprefixer')
                                  ];
                              }
                            }
                        },

          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../fonts/',
                            publicPath: '../fonts/'
                        }
                    }
                ]
            }
    ]
  },

  plugins: [
    new miniCssExtractPlugin({
      filename: '../css/app.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}