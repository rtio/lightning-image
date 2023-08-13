const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  {
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },    
    entry: './src/lightning.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'lightning-image.cjs.js',
      library: 'LightningImage',
      libraryTarget: 'commonjs2'
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
  },
  {
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },    
    entry: './src/lightning.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'lightning-image.esm.js',
      libraryTarget: 'module'
    },
    experiments: {
      outputModule: true
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
  },
  {
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },    
    entry: './src/lightning.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'lightning-image.umd.js',
      library: 'LightningImage',
      libraryTarget: 'umd',
      globalObject: 'this'
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
