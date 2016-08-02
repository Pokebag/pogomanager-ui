module.exports = {
  default: [
    'build',
    'server',
    'watch'
  ],

  build: [
    'clean',
    'buildCSS',
    'buildJS'
  ],

  buildJS: [
    'webpack'
  ],

  buildCSS: [
    'buildAppCSS',
    'buildLibCSS'
  ],

  buildAppCSS: [
    'sass_globbing',
    'sass:appCSS'
  ],

  buildLibCSS: [
    'sass:libCSS'
  ],

  dist: [
    'build',
    'cssmin',
    'uglify',
    'server'
  ],

  server: [
    'configureProxies:app',
    'connect'
  ]
}
