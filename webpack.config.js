const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: require.resolve('style-loader'),
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
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=true&reload=true&name=index&path=/__webpack_hmr',
      '@babel/polyfill',
      path.resolve(__dirname, 'src/index.js'),
    ],
    login: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=true&reload=true&name=login&path=/__webpack_hmr',
      '@babel/polyfill',
      path.resolve(__dirname, 'src/login.js'),
    ],
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, './static'),
    filename: 'static/js/[name].js',
    publicPath: '/',
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: '.hot/[hash].hot-update.json',
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
              name: 'static/images/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(eot|woff2|woff|ttf|svg)/,
            exclude: /node_modules/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 50000,
              name: 'static/fonts/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
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
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('hot'),
    }),
    new webpack.HotModuleReplacementPlugin(),
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
}
