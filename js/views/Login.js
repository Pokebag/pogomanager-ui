import Backbone from 'backbone'

import template from 'templates/Login.hbs'





export default class Login extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }

  onRender () {
    this.stickit()
  }

  onSubmit (event) {
    this.model.login()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get events () {
    return this._events || (this._events = {
      'click button[type=submit]': 'onSubmit'
    })
  }

  get bindings () {
    return {
      '#password': 'password',
      '#email': 'email'
    }
  }

  get tagName () {
    return 'form'
  }

  get ui () {
    return this._events || (this._events = {
      password: '#password',
      email: '#email'
    })
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }

  set ui (value) {
    this._ui = value
  }
}
