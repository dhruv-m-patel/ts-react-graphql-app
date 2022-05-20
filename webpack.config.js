const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

function getWebpackConfig(environment = 'production', basePath) {
  const isProduction = environment === 'production';
  const isDevelopment = environment === 'development';

  return {
    mode: environment,
    entry: {
      client: !isDevelopment
        ? path.resolve(basePath, 'src/client/index.ts')
        : [
            'webpack-hot-middleware/client?reload=true',
            path.resolve(basePath, 'src/client/index.ts'),
          ],
    },
    output: {
      filename: isProduction ? '[name].[chunkhash].js' : '[name].bundle.js',
      path: path.resolve(basePath, './build-static'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react'],
              },
            },
            {
              loader: 'react-svg-loader',
              options: { jsx: true },
            },
          ],
        },
      ],
    },
    plugins: [
      new WebpackManifestPlugin(),
      new LoadablePlugin({ writeToDisk: true }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            name: 'vendor',
            enforce: true,
          },
        },
      },
      namedModules: true,
      noEmitOnErrors: true,
      ...(isProduction && {
        minimizer: [
          new TerserPlugin({
            sourceMap: true,
            cache: true,
            parallel: true,
          }),
        ],
      }),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    devtool: isProduction ? 'cheap-source-map' : false,
    performance: {
      maxAssetSize: 500000, // in bytes
      hints: false,
    },
  };
}

const webpackConfig = getWebpackConfig(
  process.env.NODE_ENV,
  path.resolve(__dirname)
);

module.exports = {
  ...webpackConfig,
};
