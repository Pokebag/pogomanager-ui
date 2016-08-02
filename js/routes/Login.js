import Route from '../Route'
import LoginView from 'views/Login'
import UserModel from 'models/User'





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
    if (!this._model) {
      this._model = new UserModel
    }

    return this._model
  }

  get replaceElement () {
    return false
  }

  get view () {
    return LoginView
  }
}
