const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ROOT = path.join(__dirname, '..')

const commonConfigs = {
  entry: path.join(ROOT, 'src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(ROOT, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      src: path.resolve(ROOT, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Match JavaScript and JSX files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel loader
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
}

module.exports = commonConfigs
