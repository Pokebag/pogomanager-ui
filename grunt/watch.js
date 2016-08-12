module.exports = {
  options: {
    interrupt: true,
    spawn: true
  },

  appCSS: {
    files: [
      './app/scss/**/*.scss',
      '!./app/scss/_animations.scss',
      '!./app/scss/_colors.scss',
      '!./app/scss/_components.scss',
      '!./app/scss/_core.scss',
      '!./app/scss/_fonts.scss',
      '!./app/scss/_helpers.scss',
      '!./app/scss/_mixins.scss',
      '!./app/scss/_variables.scss',
      '!./app/scss/lib.scss'
    ],
    tasks: [
      'buildAppCSS'
    ]
  },

  libCSS: {
    files: [
      './app/scss/lib.scss'
    ],
    tasks: [
      'buildLibCSS'
    ]
  }
}
