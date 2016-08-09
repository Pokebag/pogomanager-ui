import Backbone from 'backbone'

import template from 'templates/Nav.hbs'





export default class Nav extends Backbone.Marionette.ItemView {

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

    this._bindEvents()

    console.log(this.model)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  get model () {
    return Backbone.Radio.channel('application').request('user')
  }

  get tagName () {
    return 'nav'
  }
}
