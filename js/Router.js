import Backbone from 'backbone'





export default class Router extends Backbone.BaseRouter {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.channel.reply('route', fragment => {
      this.navigate(fragment, {trigger: true})
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onNavigate (routeData) {
    if (routeData.linked.requireAuthentication) {
      if (!this.appChannel.request('user').get('loggedIn')) {
        return this.channel.request('route', '/login')
      }
    }

    this.channel.trigger('before:navigate', routeData.linked)

    routeData.linked.show(routeData.params)
    .then(() => {
      this.channel.trigger('navigate', routeData.linked)
    })
    .catch((error) => {
      console.error(error)
      this.channel.trigger('error')
    })
  }

  initialize () {
    this._bindEvents()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get channel () {
    return Backbone.Radio.channel('router')
  }
}
