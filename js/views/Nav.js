import Backbone from 'backbone'

import template from 'templates/Nav.hbs'





export default class Nav extends Backbone.Marionette.ItemView {

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
    Public Methods
  \******************************************************************************/

  get tagName () {
    return 'nav'
  }
}
