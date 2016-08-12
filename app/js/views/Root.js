import Backbone from 'backbone'
import Handlebars from 'handlebars'

import DialogView from '../views/Dialog'
import HeaderView from '../views/Header'
import template from '../templates/Root.hbs'





export default class Root extends Backbone.Marionette.LayoutView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }

  initialize () {
    this.render()
  }

  onRender () {
    this._initializeRegions()

    this.getRegion('header').show(new HeaderView, {
      replaceElement: true
    })

    this.getRegion('dialog').show(new DialogView, {
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
      main: 'main',
      dialog: 'dialog'
    }
  }

  get template () {
    return template
  }

  get ui () {
    return this._ui || (this._ui = {
      footer: 'footer',
      header: 'header',
      main: 'main',
      dialog: 'dialog'
    })
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set regions (value) {
    this._regions = value
  }

  set ui (value) {
    this._ui = value
  }
}
