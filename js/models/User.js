import BaseModel from 'models/Base'





export default class User extends BaseModel {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
//    console.log(window.gapi)
//    let GoogleAuth = window.gapi.auth.init({
//      client_id: '630070412872-isjkc1tg3llpabbok1mkugg184i815tn.apps.googleusercontent.com'
//    })
//
//    GoogleAuth.then(() => {
//      console.log('Success!')
//      this.set({
//        initialized: true,
//        GoogleAuth: GoogleAuth
//      })
//    })
//    .catch((error) => {
//      console.error(error)
//    })
  }

  login () {
    console.log('Logging in!', this.get('username'), this.get('password'))
  }

  logout () {}





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      initialized: false
    }
  }
}
