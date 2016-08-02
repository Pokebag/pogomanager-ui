import Backbone from 'backbone'
import marked from 'marked'
import moment from 'moment'

import BaseModel from 'models/Base'





export default class Mon extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.on('change:name change:nickname', (model, name, options) => {
      this._setDisplayName()
    })

    this.on('change:no', (model, entry, options) => {
      this._setSprite()
    })
  }

  _getPokedexEntry () {
//    this.pokedex.getEntry(this.get('no'))
//    .then((entry) => {
//      this.set('pokedex', entry)
//    })
//    .catch((error) => {
//      this.set('pokedex', 'No Pokedex entry found for ' + this.get('no'))
//    })
  }

  _setDisplayName () {
    this.set('displayName', this.get('nickname') ? this.get('nickname') : this.get('name'))
  }

  _setSprite () {
    this.set('sprite', '//pokeapi.co/media/sprites/pokemon/' + (this.get('no') || 132) + '.png')
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  evolve () {
    return new Promise((resolve, reject) => {
      $.ajax({
        data: this.get('id'),
        error: reject,
        method: 'post',
        success: resolve,
        url: '/api/evolve'
      })
    })
  }

  initialize () {
    this._bindEvents()

    if (this.get('no') === 0) {
      this.set('egg', true)

    } else {
      this._setDisplayName()
      this._getPokedexEntry()
      this._setSprite()
    }
  }

  powerUp () {
    return new Promise((resolve, reject) => {
      $.ajax({
        data: this.get('id'),
        error: reject,
        method: 'post',
        success: resolve,
        url: '/api/power-up'
      })
    })
  }

  transfer () {
    return new Promise((resolve, reject) => {
      $.ajax({
        data: this.get('id'),
        error: reject,
        method: 'post',
        success: resolve,
        url: '/api/transfer'
      })
    })
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get defaults () {
    return {
      egg: false,
      loaded: false,
      pokedex: null,
      sprite: '//pokeapi.co/media/sprites/pokemon/132.png'
    }
  }

  get idAttribute () {
    return 'longID'
  }

  get pokedex () {
    return Backbone.Radio.channel('application').request('pokedex')
  }
}
