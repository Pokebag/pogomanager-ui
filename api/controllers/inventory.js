'use strict'

let _ = require('lodash')
let Long = require('long')
let path = require('path')
let pogobuf = require('pogobuf')
let POGOProtos = require('node-pogo-protos')





let buildMon = require('../helpers/buildMon')





/******************************************************************************\
  Full Inventory
\******************************************************************************/

module.exports.inventory = function * (next) {
  let inventory = yield this.state.client.getInventory()

  this.body.data = pogobuf.Utils.splitInventory(inventory)

  this.body.data.items.forEach((item, index, array) => {
    array[index].name = pogobuf.Utils.getEnumKeyByValue(POGOProtos.Inventory.Item.ItemId, item.item_id)
  })

//    delete this.body.data.applied_items
//    delete this.body.data.currency
//    delete this.body.data.camera
//    delete this.body.data.candies
//    delete this.body.data.egg_incubators
//    delete this.body.data.inventory_upgrades
//    delete this.body.data.player
//    delete this.body.data.pokedex
//    delete this.body.data.pokemon
//    delete this.body.data.items

  yield next
}




/******************************************************************************\
  Candy
\******************************************************************************/

module.exports.candies = function * candies (next) {
  let data

  let inventory = yield this.state.client.getInventory()

  this.body.data = []

  pogobuf.Utils.splitInventory(inventory).candies.forEach((candy, index, array) => {
    this.body.data.push({
      count: candy.candy,
      family: pogobuf.Utils.getEnumKeyByValue(POGOProtos.Enums.PokemonFamilyId, candy.family_id).replace('Family ', ''),
      family_id: candy.family_id
    })
  })

  yield next
}




/******************************************************************************\
  Items
\******************************************************************************/

module.exports.items = function * items (next) {
  let data

  let inventory = yield this.state.client.getInventory()

  this.body.data = pogobuf.Utils.splitInventory(inventory).items

  this.body.data.forEach((item, index, array) => {
    array[index].name = pogobuf.Utils.getEnumKeyByValue(POGOProtos.Inventory.Item.ItemId, item.item_id)
  })

  yield next
}





/******************************************************************************\
  Pokemon
\******************************************************************************/

module.exports.pokemon = function * pokemon (next) {
  let inventory = yield this.state.client.getInventory()
  this.body.data = []

  pogobuf.Utils.splitInventory(inventory).pokemon.forEach((mon, index, array) => {
    if (!mon.is_egg) {
      this.body.data.push(buildMon.call(this, mon))
    }
  })

  yield next
}
