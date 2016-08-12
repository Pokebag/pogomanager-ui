import Route from '../Route'
import LoginView from '../views/Login'





export default class Login extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow (params) {
    this.viewOptions.model = this.model

    if (this.model.get('loggedIn')) {
      this.routerChannel.request('route', '/pokemon')
    }
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return Backbone.Radio.channel('application').request('user')
  }

  get replaceElement () {
    return false
  }

  get title () {
    return 'Login'
  }

  get view () {
    return LoginView
  }
}
