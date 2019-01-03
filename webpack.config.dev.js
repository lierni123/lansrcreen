const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const config = require('./server.config')
const version = new Date().getTime()
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('lost'),
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ]
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor))
  }
  return loaders
}
const vendors = [
  'whatwg-fetch',
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'react-router',
  'mobx',
  'mobx-react',
]
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    login: path.resolve(__dirname, 'src/login.js'),
    vendors: vendors,
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, '../webcenter/' + config.platformName),
    chunkFilename: `[name].chunk.js?v=${version}`,
    filename: '[name].js',
  },
  externals: {
    echarts: 'echarts',
    jquery: 'jQuery',
    moment: 'moment',
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        oneOf: [
          {
            test: /\.(bmp|gif|png|jpeg|jpg)/,
            exclude: /node_modules/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'images/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(eot|woff2|woff|ttf|otf|svg)/,
            loader: require.resolve('file-loader'),
            options: {
              limit: 50000,
              name: 'fonts/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
            }),
          },
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            }),
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader'),
          },
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              'sass-loader'
            ),
          },
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getStyleLoaders({ importLoaders: 2 }, 'less-loader'),
          },
          {
            test: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              'less-loader'
            ),
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new MiniCssExtractPlugin({
      filename: `[name].css`,
      chunkFilename: `[id].chunk.css?v=${version}`,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
    alias: {
      '@Components': path.join(__dirname, './src/Components'),
      '@BaseComs': path.join(__dirname, './src/Components/BaseComponents'),
      '@InternetComs': path.join(__dirname, './src/Components/InternetStyleComponents'),
      '@LayoutComs': path.join(__dirname, './src/Components/LayoutComponents'),
      '@MetaCodeComs': path.join(__dirname, './src/Components/MetaCodeComponents'),
      '@DwrComs': path.join(__dirname, './src/Components/DwrComponents'),
      '@utils': path.join(__dirname, './src/utils'),
      '@apis': path.join(__dirname, './src/apis'),
      '@images': path.join(__dirname, './src/static/images'),
      '@fonts': path.join(__dirname, './src/static/fonts'),
      '@frameRootStore': path.join(__dirname, './src/store'),
      '@config': path.join(__dirname, './src/config'),
    },
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: false,
}
