'use strict'

let _ = require('lodash')
let Long = require('long')
let pogobuf = require('pogobuf')
let POGOProtos = require('node-pogo-protos')





let findLevel = require('../helpers/findLevel')
let specialStats = require('../data/special-stats.json')





let junkTexts = {
  family: 'Family ',
  move: ' Fast',
  type: 'Pokemon Type '
}





function getEnum (enums, key, junkText) {
  // Retrieve enum
  let string = pogobuf.Utils.getEnumKeyByValue(enums, key)

  if (junkText) {
    // Eliminate junk text
    string = string.replace(junkText, '')
  }

  return string
}





function getFamily (key) {
  return getEnum(POGOProtos.Enums.PokemonFamilyId, key, junkTexts.family)
}





function getMove (key) {
  let moveData = _.find(this.state.templates.move_settings, {
    movement_id: key
  })

  return {
    damage: moveData.power,
    name: getEnum(POGOProtos.Enums.PokemonMove, key, junkTexts.move),
    type: getType(moveData.pokemon_type)
  }
}





function getName (key) {
  return getEnum(POGOProtos.Enums.PokemonId, key, junkTexts.type)
}





function getType (key) {
  return getEnum(POGOProtos.Enums.PokemonType, key, junkTexts.type)
}





module.exports = function buildMon (inventoryData) {
  let baseInfo = _.find(this.state.templates.pokemon_settings, {
    pokemon_id: inventoryData.pokemon_id
  })
  let longID = new Long(inventoryData.id.low, inventoryData.id.high, inventoryData.id.unsigned).toString()
  let specials = _.find(specialStats, {no: inventoryData.pokemon_id})
  let upgradeInfo = this.state.templates.pokemon_upgrade_settings

  let mon = {
    cp: inventoryData.cp,
    id: inventoryData.id,
    level: findLevel(inventoryData.cp_multiplier, inventoryData.num_upgrades),
    longID: longID,
    moves: [],
    name: getName(inventoryData.pokemon_id),
    nickname: inventoryData.nickname,
    no: inventoryData.pokemon_id,
    stats: {
      additionalCpMultiplier: inventoryData.additional_cp_multiplier,
      cpMultiplier: inventoryData.cp_multiplier,
      currentHP: inventoryData.stamina,
      height: inventoryData.height_m,
      hp: {
        current: inventoryData.stamina,
        max: inventoryData.stamina_max
      },
      iv: {
        attack: inventoryData.individual_attack,
        defense: inventoryData.individual_defense,
        stamina: inventoryData.individual_stamina
      },
      maxHP: inventoryData.stamina_max,
      special: {
        attack: specials.specialAttack,
        defense: specials.specialDefense
      },
      speed: specials.speed,
      weight: inventoryData.weight_kg,
    },
    upgrades: inventoryData.num_upgrades
  }

  mon.moves.push(getMove.call(this, inventoryData.move_1))
  mon.moves.push(getMove.call(this, inventoryData.move_2))

  mon.family_id = baseInfo.family_id
  mon.family = getFamily(baseInfo.family_id)

  mon.stats.base = {
    attack: baseInfo.stats.base_attack,
    defense: baseInfo.stats.base_defense,
    stamina: baseInfo.stats.base_stamina
  }

  if (baseInfo.candy_to_evolve) {
    mon.toEvolve = {
      candy: baseInfo.candy_to_evolve
    }
  }

  if (mon.level < 40) {
    let levelFloor = Math.floor(mon.level) - 1

    mon.toPowerUp = {
      candy: upgradeInfo.candy_cost[levelFloor],
      stardust: upgradeInfo.stardust_cost[levelFloor]
    }
  }

  mon.types = [getType(baseInfo.type)]

  if (baseInfo.type2) {
    mon.types.push(getType(baseInfo.type2))
  }

  return mon
}
