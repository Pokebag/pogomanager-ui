'use strict'

let serveStatic = require('serve-static')





module.exports = {
  app: {
    options: {
      keepalive: process.env.KEEPALIVE || false,

      middleware: function (connect, options) {
        let middlewares = [
          require('connect-livereload')({
            rules: [{
              match: /<\/head>(?![\s\S]*<\/head>)/i,
              fn: function (match, script) {
                return script + match
              }
            }]
          }),
          require('grunt-connect-proxy/lib/utils').proxyRequest,
          require('connect-pushstate')()
        ]

        if (!Array.isArray(options.base)) {
          options.base = [options.base]
        }

        options.base.forEach(function (base) {
          middlewares.push(serveStatic(base))
        })

        return middlewares
      },
      port: process.env.PORT || 3000
    },

    proxies: [
      {
        context: [
          '/api'
        ],
        host: 'localhost',
        port: process.env.API_PORT || 3001,
        rewrite: {
          '^/api': ''
        }
      }
    ]
  }
}
