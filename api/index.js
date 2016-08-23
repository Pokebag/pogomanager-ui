'use strict'

const co = require('co')

let auth = require('./controllers/auth')
let inventory = require('./controllers/inventory')
let pokemon = require('./controllers/pokemon')
let templates = require('./controllers/templates')

let login = require('./middleware/login')
let getItemTemplates = require('./middleware/getItemTemplates')





module.exports = new class API {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _compose (stack) {
    return function * (next){
      if (!next) {
        next = function * () {}
      }

      let i = stack.length

      while (i--) {
        next = stack[i].call(this, next)
      }

      return yield * next
    }
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  get (routeName, data) {
    return this.route('get', routeName, data)
  }

  post (routeName, data) {
    return this.route('post', routeName, data)
  }

  route (method, routeName, data) {
    return co.wrap(this._compose(this.routes[method][routeName]))()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get routes () {
    return {
      get: {
        // Inventory
        candies: [login(), getItemTemplates(), inventory.candies],
        items: [login(), getItemTemplates(), inventory.items],
        pokemon: [login(), getItemTemplates(), inventory.pokemon],

        // Debugging
        inventory: [login(), getItemTemplates(), inventory.inventory],
        templates: [login(), getItemTemplates(), templates.templates]
      },

      post: {
        // Pokémon Operations
        evolve: [login(), getItemTemplates(), pokemon.evolve],
        login: [login(), getItemTemplates(), templates.templates],
        powerUp: [login(), getItemTemplates(), pokemon.powerUp],
        transfer: [login(), getItemTemplates(), pokemon.transfer],

        // Auth
        login: [auth.login],
        logout: [auth.logout]
      }
    }
  }
}
