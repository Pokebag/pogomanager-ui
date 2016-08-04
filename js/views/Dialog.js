import Backbone from 'backbone'

import template from 'templates/Dialog.hbs'





export default class Dialog extends Backbone.Marionette.ItemView {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.el.addEventListener('close', () => {
      this.trigger('close')
    })

    this.el.addEventListener('cancel', () => {
      this.trigger('cancel')
    })

    this.appChannel.reply('dialog', this.show.bind(this))
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  cancel () {
    this.trigger('cancel')
    this.el.close()
  }

  close () {
    this.el.close()
  }

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }

  initialize () {
    this._bindEvents()
  }

  show (options) {
    this.model.clear()
    this.model.set(options)
    this.render()
    this.el.showModal()

    return new Promise((resolve, reject) => {
      this.once('close', resolve)
      this.once('cancel', reject)
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get events () {
    return this._events || (this._events = {
      'click button[name=cancel]': 'cancel',
      'click button[name=confirm]': 'close'
    })
  }

  get model () {
    return this._model || (this._model = new Backbone.Model)
  }

  get tagName () {
    return 'dialog'
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set events (value) {
    this._events = value
  }

  set model (value) {
    this._model = value
  }
}
