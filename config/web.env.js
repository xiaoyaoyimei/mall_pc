'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"web"',
  API_HOST:'"http://10.0.0.28:8080/mall"',
  HOST:'10.0.0.18',
})
