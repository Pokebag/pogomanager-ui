import Backbone from 'backbone'





export default class Router extends Backbone.BaseRouter {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.channel.on('route', this.navigate)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onNavigate (routeData) {
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





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get channel () {
    return Backbone.Radio.channel('router')
  }
}
