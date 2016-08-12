import BaseModel from './Base'
import CandiesCollection from '../collections/Candies'
import PokemonCollection from '../collections/Pokemon'





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
        error: (xhr) => {
          if (xhr.status === 403) {
            this.routerChannel.request('route', '/login')
          }

          reject()
        },
        method: 'post',
        success: (response, status, xhr) => {
          this.set({
            loggedIn: true,
            loggingIn: false,
            password: ''
          })

          this.get('candies').fetch()
          .then(() => {
            this.get('pokemon').fetch()
          })

          this.routerChannel.request('route', '/pokemon')

          resolve()
        },
        url: this.url
      })
    })
  }

  logout () {
    this.get('candies').reset()
    this.get('pokemon').reset()
    this.set('loggedIn', false)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      candies: new CandiesCollection,
      email: '',
      loggedIn: false,
      loggingIn: false,
      password: '',
      pokemon: new PokemonCollection
    }
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }

  get url () {
    return '/api/login'
  }
}
