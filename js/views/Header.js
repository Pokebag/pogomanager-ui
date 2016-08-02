import Backbone from 'backbone'

import NavView from 'views/Nav'
import template from 'templates/Header.hbs'





export default class Header extends Backbone.Marionette.LayoutView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      attributes: {
        role: 'banner'
      },
      regions: {
        brand: '.brand',
        nav: 'nav'
      },
      tagName: 'header',
      template: template
    })

    super(options)
  }

  onBeforeShow () {
    this.getRegion('nav').show(new NavView, {
      replaceElement: true
    })
  }
}
