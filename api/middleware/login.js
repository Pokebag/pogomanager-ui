'use strict'

let pogobuf = require('pogobuf')





function * login (next) {
  let email = this.cookies.get('email')
  let masterToken = this.cookies.get('token')

  if (email && masterToken) {
    let GoogleAuth = new pogobuf.GoogleLogin()

    this.state.client = new pogobuf.Client()

    let token = yield GoogleAuth.getToken(email, {
      androidId: '9774d56d682e549c',
      masterToken: masterToken
    })
    .then(authData => {
      return authData.Auth
    })

    this.state.client.setAuthInfo('google', token)

    yield this.state.client.init()

    yield next

  } else {
    this.body.errors.push('No user is logged in.')
    this.status = 403
  }
}





module.exports = function () {
  return login
}
