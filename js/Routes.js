import Route from './Route'

import LoginRoute from 'routes/Login'
import LogoutRoute from 'routes/Logout'
import PokemonListRoute from 'routes/PokemonList'





export default {
  routes: {
    'login(/)': new LoginRoute,
    'logout(/)': new LogoutRoute,
    'pokemon(/)': new PokemonListRoute,
    '*notfound': new PokemonListRoute
  }
}
