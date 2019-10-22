'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://100.10.10.10/dev/"',
  ADMIN_BASE_API: '"http://192.168.1.4/admin/api"'
})
