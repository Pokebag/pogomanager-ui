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

    this.on('change:stats', (model, name, options) => {
      this._setStats()
    })

    this.on('change:no', (model, entry, options) => {
      this._setDisplayNo()
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

  _setDisplayNo () {
    let no = this.get('no').toString()

    if (no.length < 2) no = `0${no}`
    if (no.length < 3) no = `0${no}`

    this.set('displayNo', no)
  }

  _setSprite () {
    this.set('sprite', '//assets.pokemon.com/assets/cms2/img/pokedex/detail/' + (this.get('displayNo') || 132) + '.png')
  }

  _setStats () {
    let statNames = ['attack', 'defense', 'stamina']
    let stats = this.get('stats')

    statNames.forEach(stat => {
      this.set(stat, stats.base[stat] + stats.iv[stat])
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  evolve () {
    this.appChannel.request('dialog', {
      body: `Are you sure you want to evolve ${this.get('displayName')}?`,
      title: 'Confirm'
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        this.set('evolving', true)

        $.ajax({
          data: this.get('id'),
          error: reject,
          method: 'post',
          success: (response, status, xhr) => {
            resolve(this.set(response.data))
            this.set('evolving', false)
          },
          url: '/api/evolve'
        })
      })
    })
    .catch(() => {})
  }

  initialize () {
    this._bindEvents()

    if (this.get('no') === 0) {
      this.set('egg', true)

    } else {
      this._setDisplayName()
      this._setDisplayNo()
      this._getPokedexEntry()
      this._setSprite()
      this._setStats()
    }
  }

  powerUp () {
    this.appChannel.request('dialog', {
      body: `Are you sure you want to power up ${this.get('displayName')}?`,
      title: 'Confirm'
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        this.set('poweringUp', true)

        $.ajax({
          data: this.get('id'),
          error: reject,
          method: 'post',
          success: (response, status, xhr) => {
            resolve(this.set(response.data))
            this.set('poweringUp', false)
          },
          url: '/api/power-up'
        })
      })
    })
    .catch(() => {})
  }

  transfer () {
    this.appChannel.request('dialog', {
      body: `Are you sure you want to transfer ${this.get('displayName')}?`,
      title: 'Confirm'
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        this.set('transferring', true)

        $.ajax({
          data: this.get('id'),
          error: reject,
          method: 'post',
          success: (response, status, xhr) => {
            resolve(this.collection.remove(this))
          },
          url: '/api/transfer'
        })
      })
    })
    .catch(() => {})
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get appChannel () {
    return Backbone.Radio.channel('application')
  }

  get defaults () {
    return {
      displayNo: '132',
      egg: false,
      evolving: false,
      loaded: false,
      pokedex: null,
      poweringUp: false,
      sprite: '//pokeapi.co/media/sprites/pokemon/132.png',
      transferring: false
    }
  }

  get idAttribute () {
    return 'longID'
  }

  get pokedex () {
    return Backbone.Radio.channel('application').request('pokedex')
  }
}
