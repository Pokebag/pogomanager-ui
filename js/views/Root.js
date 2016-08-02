import Backbone from 'backbone'

import HeaderView from 'views/Header'
import template from 'templates/Root.hbs'





export default class Root extends Backbone.Marionette.LayoutView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this.render()
  }

  onRender () {
    this.getRegion('header').show(new HeaderView, {
      replaceElement: true
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get el () {
    return 'body'
  }

  get regions () {
    return this._regions = {
      footer: 'footer',
      header: 'header',
      main: 'main'
    }
  }

  get template () {
    return template
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set regions (value) {
    this._regions = value
  }
}
