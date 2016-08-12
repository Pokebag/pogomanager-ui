import Route from '../Route'
import PokemonListView from '../views/PokemonList'





export default class PokemonList extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  loadData (params) {
    return new Promise((resolve, reject) => {
      this.viewOptions.collection = this.appChannel.request('pokemon')

      this.viewOptions.collection.fetch({
        error: reject,
        success: resolve
      })
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get replaceElement () {
    return false
  }

  get requireAuthentication () {
    return true
  }

  get title () {
    return 'Pok&eacute;mon'
  }

  get view () {
    return PokemonListView
  }
}
