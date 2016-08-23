'use strict'

let _ = require('lodash')
let path = require('path')





let levelConversions = require('../data/level-conversions.json')





module.exports = function findLevel (cpMultiplier, upgrades) {
  let possibleMultipliers = Object.keys(levelConversions)
  let level = levelConversions

  for (let i = 0; i < possibleMultipliers.length; i++) {
    let possibleMultiplier = possibleMultipliers[i]

    if (Math.round(cpMultiplier * 1000) === Math.round(parseFloat(possibleMultiplier) * 1000)) {
      level = levelConversions[possibleMultiplier]
      break
    }
  }

  if (upgrades) {
    level += upgrades / 2
  }

  return level
}
