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

  onSubmit (event) {
    this.model.login()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get events () {
    return this._events || (this._events = {
      'submit form': 'onSubmit'
    })
  }

  get bindings () {
    return {
      '#password': 'password',
      '#username': 'username'
    }
  }

  get ui () {
    return this._events || (this._events = {
      password: '#password',
      username: '#username'
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
