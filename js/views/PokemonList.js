import Backbone from 'backbone'
import Handlebars from 'handlebars'

import template from '../templates/PokemonList.hbs'
import PokemonListItemView from '../views/PokemonListItem'





export default class PokemonList extends Backbone.Marionette.CollectionView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get childView () {
    return PokemonListItemView
  }

  get className () {
    return 'grid'
  }

  get tagName () {
    return 'ol'
  }
}
