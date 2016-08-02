import Route from './Route'

import LoginRoute from 'routes/Login'
import PokemonListRoute from 'routes/PokemonList'





export default {
  routes: {
    'login(/)': new LoginRoute,
    'pokemon(/)': new PokemonListRoute,
    '*notfound': new PokemonListRoute
  }
}
