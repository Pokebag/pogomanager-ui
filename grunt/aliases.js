module.exports = {
  default: [
    'build',
    'watch'
  ],

  build: [
    'clean',
    'buildCSS'
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
    'cssmin'
  ]
}
