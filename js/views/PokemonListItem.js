import Backbone from 'backbone'

import template from 'templates/PokemonListItem.hbs'





export default class PokemonListItem extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.listenTo(this.model, 'change', this.render)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }

  evolve () {
    this.model.evolve()
  }

  initialize () {
    this._bindEvents()
  }

  powerUp () {
    this.model.powerUp()
  }

  transfer () {
    this.model.transfer()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get className () {
    return 'card'
  }

  get events () {
    return this._events || (this._events = {
      'click button[name=evolve]': 'evolve',
      'click button[name=power-up]': 'powerUp',
      'click button[name=transfer]': 'transfer'
    })
  }

  get tagName () {
    return 'li'
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }
}
