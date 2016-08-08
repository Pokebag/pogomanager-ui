import Backbone from 'backbone'





export default class Router extends Backbone.BaseRouter {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _authenticate (routeData) {
    if (routeData.linked.requireAuthentication) {
      let user = this.appChannel.request('user')

      if (!user.get('loggedIn')) {
        return user.login()

      } else {
        return Promise.resolve()
      }

    } else {
      return Promise.resolve()
    }
  }

  _bindEvents () {
    this.channel.reply('route', fragment => {
      this.navigate(fragment, {trigger: true})
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onNavigate (routeData) {
    this._authenticate(routeData)
    .then(() => {
      this.channel.trigger('before:navigate', routeData.linked)

      routeData.linked.show(routeData.params)
      .then(() => {
        this.channel.trigger('navigate', routeData.linked)

      })
      .catch((error) => {
        console.error(error)
        this.channel.trigger('error')
      })
    })
    .catch(() => {
      return this.channel.request('route', '/login')
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
