'use strict'

let _ = require('lodash')

let config = require('../config.json')





/******************************************************************************\
  Subscribe
\******************************************************************************/

module.exports.subscribe = function * subscribe (next) {
  let User = require('mongoose').model('User')

  // Delete the user from MongoDB
//  yield User.remove({
//    email: this.cookies.get('email')
//  })

  yield next
}





/******************************************************************************\
  Unsubscribe
\******************************************************************************/

module.exports.unsubscribe = function * unsubscribe (next) {
  let User = require('mongoose').model('User')

  // Delete the user from MongoDB
//  yield User.remove({
//    email: this.cookies.get('email')
//  })

  yield next
}
