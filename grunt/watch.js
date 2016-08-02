module.exports = {
  options: {
    interrupt: true,
    livereload: true,
    spawn: true
  },

  appJS: {
    files: [
      'bower.json',
      'config.json',
      'package.json',
      'js/**/*.js',
      'templates/**/*.hbs'
    ],
    tasks: [
      'buildJS'
    ]
  },

  appCSS: {
    files: [
      'scss/**/*.scss',
      '!scss/_animations.scss',
      '!scss/_colors.scss',
      '!scss/_components.scss',
      '!scss/_core.scss',
      '!scss/_fonts.scss',
      '!scss/_mixins.scss',
      '!scss/_variables.scss',
      '!scss/lib.scss'
    ],
    tasks: [
      'buildAppCSS'
    ],
    options: {
      livereload: true
    }
  },

  libCSS: {
    files: [
      'scss/lib.scss'
    ],
    tasks: [
      'buildLibCSS'
    ],
    options: {
      livereload: true
    }
  }
}
