const express = require('express')
const app = express()
const path = require('path')
const webpack = require('webpack')
const proxy = require('http-proxy-middleware')
const webpackDevConfig = require('./webpack.config')
const openBrowser = require('react-dev-utils/openBrowser')
const config = require('./server.config')
const compiler = webpack(webpackDevConfig)
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath,
  })
)
app.use(require('webpack-hot-middleware')(compiler))
app.use(express.static('static'))

function start(pathName, host, domain) {
  app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './login.html')))
  app.get('/' + pathName, (req, res) => res.sendFile(path.resolve(__dirname, './index.html')))

  app.get(
    '/verifycode',
    proxy({
      target: host,
      proxyRes: (proxyRes, req, res) => {
        proxyRes.setHeader('Content-Type', 'image/png')
      },
    })
  )
  app.post(
    '/login',
    proxy({
      target: host,
    })
  )
  app.post(
    '/' + pathName + '/*',
    proxy({
      target: host,
      changeOrigin: true,
    })
  )
  app.get(
    '/' + pathName + '/loginout',
    proxy({
      target: host,
    })
  )
  app.listen(3000, () => {
    openBrowser(`http://${domain}:3000`)
    console.log(`server running at http://${domain}:3000`)
  })
}

start(config.platformName, config.proxy, config.domain)
