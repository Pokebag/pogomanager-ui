'use strict'





/******************************************************************************\
  Full Inventory
\******************************************************************************/

module.exports.templates = function * templates (next) {
  this.body.data = this.state.templates

//  delete this.body.data.badge_settings
//  delete this.body.data.battle_settings
//  delete this.body.data.camera_settings
//  delete this.body.data.encounter_settings
//  delete this.body.data.equipped_badge_settings
//  delete this.body.data.gym_level_settings
//  delete this.body.data.iap_item_display
//  delete this.body.data.iap_settings
//  delete this.body.data.item_settings
//  delete this.body.data.move_sequence_settings
//  delete this.body.data.move_settings
//  delete this.body.data.player_level_settings
//  delete this.body.data.pokemon_settings
//  delete this.body.data.pokemon_upgrade_settings
//  delete this.body.data.type_effective_settings

  yield next
}
