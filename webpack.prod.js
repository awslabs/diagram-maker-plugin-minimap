const baseConfig = require('./webpack.common.js');
const path = require('path');
const merge = require('webpack-merge').merge;
const DeclarationBundlePlugin = require('./DeclarationBundlePlugin.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// TODO: We can add a threshold on the asset size in our build setp here.

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  bail: true,
  output: {
    filename: 'diagramMakerMinimap.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'diagramMakerMinimap',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'react': 'react',
    'react-dom' : 'react-dom',
    'diagramMaker' : 'diagramMaker'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [
    // Extract all CSS
    new MiniCssExtractPlugin({
      filename: 'diagramMakerMinimap.css'
    }),
    new DeclarationBundlePlugin({
      name: 'diagramMakerMinimap.d.ts'
    })
  ],
  stats: {
    // This is because of a limitation in ts-loader
    // https://github.com/TypeStrong/ts-loader#transpileonly-boolean-defaultfalse
    warningsFilter: /export .* was not found in/
  }
});
