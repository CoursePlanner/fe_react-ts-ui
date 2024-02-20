const path = require('path')
const ROOT = path.join(__dirname, '..')

const commonConfigs = require('./webpack.common.config')

module.exports = {
  ...commonConfigs,
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
}
