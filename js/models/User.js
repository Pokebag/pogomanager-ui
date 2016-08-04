import BaseModel from 'models/Base'





export default class User extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

//  _handleAuthInit () {
//    gapi.auth2.init({
//      client_id: '630070412872-isjkc1tg3llpabbok1mkugg184i815tn.apps.googleusercontent.com'
//    })
//    .then(() => {
//      let GoogleAuth = gapi.auth2.getAuthInstance()
//
//      this.set({
//        initialized: true,
//        GoogleAuth: GoogleAuth
//      })
//
//      GoogleAuth.isSignedIn.listen(this._updateSigninStatus)
//
//      this._updateSigninStatus(GoogleAuth.isSignedIn.get())
//    })
//  }

//  _updateSigninStatus (isSignedIn) {
//    this.set('isSignedIn', isSignedIn)
//  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
//    gapi.load('client:auth2', this._handleAuthInit.bind(this))
//    gapi.load('client:auth', this._handleAuthInit.bind(this))
  }

  login () {
    console.log('Logging in!', this.get('username'), this.get('password'))
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      initialized: false,
      password: '',
      username: ''
    }
  }
}
