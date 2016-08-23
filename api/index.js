'use strict'

let auth = require('./controllers/auth')
let inventory = require('./controllers/inventory')
let pokemon = require('./controllers/pokemon')
let templates = require('./controllers/templates')

let login = require('./middleware/login')
let getItemTemplates = require('./middleware/getItemTemplates')





export default class API {
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

  route () {
    return function * (routeName) {
      let route = this.routes[routeName]
      console.log(route)
//      this._compose(route)
    }
  }

  get routes () {
    return {
      // Inventory
      candies: [login(), getItemTemplates(), inventory.candies],
      items: [login(), getItemTemplates(), inventory.items],
      pokemon: [login(), getItemTemplates(), inventory.pokemon],
      items: [login(), getItemTemplates(), inventory.pokemon],

      // Pokémon Operations
      evolve: [login(), getItemTemplates(), pokemon.evolve],
      login: [login(), getItemTemplates(), templates.templates],
      powerUp: [login(), getItemTemplates(), pokemon.powerUp],
      transfer: [login(), getItemTemplates(), pokemon.transfer],

      // Auth
      login: [auth.login],
      logout: [auth.logout],

      // Debugging
      inventory: [login(), getItemTemplates(), inventory.inventory],
      templates: [login(), getItemTemplates(), templates.templates]
    }
  }
}
