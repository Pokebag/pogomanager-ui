import Backbone from 'backbone'





export default class Route extends Backbone.Marionette.Object {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _show () {
    app.main.show(new this.view(this.viewOptions), {
      replaceElement: this.replaceElement
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    super()

    this.viewOptions = {
      template: false
    }
  }

  // no-op, always return a Promise
  loadData () {
    return Promise.resolve()
  }

  // no-op
  onBeforeShow (params) {
    return
  }

  show (params) {
    this.onBeforeShow(params)

    return new Promise((resolve, reject) => {
      this.loadData(params)
      .then(() => {
        this._show()

        resolve()
      })
      .catch(reject)
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get replaceElement () {
    return true
  }

  get requireAuthentication () {
    return false
  }

  get routerChannel () {
    return Backbone.Radio.channel('router')
  }

  get tagName () {
    return 'main'
  }

  get title () {
    return 'Untitled'
  }

  get view () {
    return Backbone.Marionette.ItemView
  }
}
