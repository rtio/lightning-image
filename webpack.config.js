const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  {
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    entry: './src/lightning.ts',
    output: {
      library: {
        name: 'LightningImage',
        type: 'umd',
        umdNamedDefine: true,
        auxiliaryComment: {
          root: 'Root Comment',
          commonjs: 'CommonJS Comment',
          commonjs2: 'CommonJS2 Comment',
          amd: 'AMD Comment',
        },
      },
      globalObject: 'this',
      path: path.resolve(__dirname, 'dist'),
      filename: 'lightning-image.js',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader'
          }
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    }
  }
];
