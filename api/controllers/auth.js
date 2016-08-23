'use strict'

let _ = require('lodash')
let pogobuf = require('pogobuf')





/******************************************************************************\
  Login
\******************************************************************************/

module.exports.login = function * login (next) {
  let GoogleAuth = new pogobuf.GoogleLogin()
  let User = require('mongoose').model('User')

  let email = this.cookies.get('email')
  let token = this.cookies.get('token')

  // If the user is already logged in, skip authentication
  if (email && token) {
    this.body.data = {
      email: email
    }

    return yield next
  }

  // Memoize the user's credentials
  email = this.request.body.email
  let password = this.request.body.password

  let isSubscriber = true

  if (!isSubscriber) {
    this.throw(`User is not on the beta list.`, 403)
  }

  // Try to find the user in the database
  let user = yield User.findOne({
    email: email
  })

  // If a user isn't found, let's create one
  if (!user) {
    if (email && password) {
      // Get a master token
      let masterToken = yield GoogleAuth.getMasterToken(email, password)
      .then(response => {
        return response.masterToken
      })

      user = new User({
        email: email,
        token: masterToken
      })

      user = yield user.save()

    } else {
      this.status = 403
      return
    }
  }

  this.body.data = {
    email: user.email
  }

  this.cookies.set('email', user.email)
  this.cookies.set('token', user.token)

  yield next
}





/******************************************************************************\
  Logout
\******************************************************************************/

module.exports.logout = function * logout (next) {
  let User = require('mongoose').model('User')

  // Delete the user from MongoDB
  yield User.remove({
    email: this.cookies.get('email')
  })

  this.cookies.set('email', null)
  this.cookies.set('token', null)

  yield next
}
