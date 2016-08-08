import Route from '../Route'
import LoginView from 'views/Login'





export default class Login extends Route {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  onBeforeShow (params) {
    this.viewOptions.model = this.model
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

  get view () {
    return LoginView
  }
}
