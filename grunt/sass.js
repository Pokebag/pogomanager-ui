module.exports = {
  appCSS: {
    options: {
      style: 'expanded'
    },

    files: {
      './app/css/app.css': './app/scss/app.scss'
    }
  },

  libCSS: {
    options: {
      style: 'expanded'
    },

    files: {
      './app/css/lib.css': './app/scss/lib.scss'
    }
  }
}
