import Backbone from 'backbone'

import template from 'templates/Login.hbs'





export default class Login extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
//    this.once('signin2:loaded', () => {
//      gapi.signin2.render('google-signin')
//    })

    this.model.on('change', function () {
      console.log('model change:', arguments)
    })
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

  initialize () {
    this._bindEvents()

//    gapi.load('client:signin2', () => {
//      this.trigger('signin2:loaded')
//    })
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
      'submit form': 'onSubmit'
    })
  }

  get bindings () {
    return {
      '#password': 'password',
      '#username': 'username'
    }
  }

  get tagName () {
    return 'form'
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
