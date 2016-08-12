module.exports = {
  app: {
    files: {
      './app/scss/_animations.scss': './app/scss/animations/**/*.scss',
      './app/scss/_colors.scss': './app/scss/colors/**/*.scss',
      './app/scss/_components.scss': './app/scss/components/**/*.scss',
      './app/scss/_core.scss': './app/scss/core/**/*.scss',
      './app/scss/_fonts.scss': './app/scss/fonts/**/*.scss',
      './app/scss/_helpers.scss': './app/scss/helpers/**/*.scss',
      './app/scss/_mixins.scss': './app/scss/mixins/**/*.scss',
      './app/scss/_variables.scss': './app/scss/variables/**/*.scss'
    },
    options: {
      signature: false,
      useSingleQuotes: true
    }
  }
}
