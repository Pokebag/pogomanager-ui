import BaseModel from 'models/Base'





export default class User extends BaseModel {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  login () {
    return new Promise((resolve, reject) => {
      this.set('loggingIn', true)

      $.ajax({
        data: {
          password: this.get('password'),
          email: this.get('email')
        },
        error: reject,
        method: 'post',
        success: (response, status, xhr) => {
          this.set({
            loggedIn: true,
            loggingIn: false,
            password: ''
          })

          this.routerChannel.request('route', '/pokemon')

          resolve()
        },
        url: this.url
      })
    })
  }

  logout () {
    localStorage.setItem('email', null)
    localStorage.setItem('token', null)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      email: '',
      loggedIn: false,
      loggingIn: false,
      password: ''
    }
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }

  get url () {
    return '/api/login'
  }
}
