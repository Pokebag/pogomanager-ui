'use strict'

let Long = require('long')
let path = require('path')
let pogobuf = require('pogobuf')





let buildMon = require('../helpers/buildMon')





let client = new pogobuf.Client()
let login = new pogobuf.GoogleLogin()
let utils = pogobuf.Utils





/******************************************************************************\
  Evolve
\******************************************************************************/

module.exports.evolve = function * evolve (next) {
  let id = new Long(this.request.body.low, this.request.body.high, this.request.body.unsigned)

  let response = yield this.state.client.evolvePokemon(id)

  if (!response.evolved_pokemon_data) {
    return new Error('Failed to evolve. That sucks.')
  }

  this.body.data = {
    candies: response.candy_awarded,
    xp: response.experience_awarded,
    pokemon: buildMon.call(this, response.evolved_pokemon_data)
  }

  yield next
}





/******************************************************************************\
  Power Up
\******************************************************************************/

module.exports.powerUp = function * powerUp (next) {
  let id = new Long(this.request.body.low, this.request.body.high, this.request.body.unsigned)

  let response = yield this.state.client.upgradePokemon(id)

  if (!response.upgraded_pokemon) {
    return new Error('Not enough candies or stardust. I don\'t fucking know.')
  }

  this.body.data = buildMon.call(this, response.upgraded_pokemon)

  yield next
}





/******************************************************************************\
  Transfer
\******************************************************************************/

module.exports.transfer = function * transfer (next) {
  let id = new Long(this.request.body.low, this.request.body.high, this.request.body.unsigned)

  let response = yield this.state.client.releasePokemon(id)

  this.body.data = {
    candies: response.candy_awarded
  }

  yield next
}
