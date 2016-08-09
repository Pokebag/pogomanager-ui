import Backbone from 'backbone'
import marked from 'marked'
import moment from 'moment'

import BaseModel from 'models/Base'





export default class Mon extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.on('change:candies', this._candyUpdate)

    this.on('change:name change:nickname', this._setDisplayName)

    this.on('change:no', (model, entry, options) => {
      this._setDisplayNo()
      this._setSprite()
    })

    this.on('change:stats', this._setStats)
  }

  _candyUpdate () {
    this._setCandyCount()
    this._setCanEvolve()
    this._setCanPowerUp()
  }

  _getCandy () {
    let candiesCollection = this.appChannel.request('candies')

    this.set('candies', candiesCollection.findWhere({
      family_id: this.get('family_id')
    }))

    this.listenTo(this.get('candies'), 'change', this._candyUpdate)
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

  _setCandyCount () {
    this.set('candyCount', this.get('candies').get('count'))
  }

  _setCanEvolve () {
    this.set('canEvolve', this.get('toEvolve') <= this.get('candies').get('count'))
  }

  _setCanPowerUp () {
//    this.set('canEvolve', this.get('toPowerUp') <= this.get('candies').get('count'))
  }

  _setDisplayName () {
    let nickname = this.get('nickname')

    this.set('displayName', nickname ? nickname : this.get('name'))
  }

  _setDisplayNo () {
    let no = this.get('no').toString()

    if (no.length < 2) no = `0${no}`
    if (no.length < 3) no = `0${no}`

    this.set('displayNo', no)
  }

  _setPerfect () {
    this._setPerfectAttack()
    this._setPerfectDefense()
    this._setPerfectStamina()

    this.set('perfect', this.get('perfectAttack') && this.get('perfectDefense') && this.get('perfectStamina'))
  }

  _setPerfectAttack () {
    this.set('perfectAttack', this.get('stats').attack === 15)
  }

  _setPerfectDefense () {
    this.set('perfectDefense', this.get('stats').defense === 15)
  }

  _setPerfectStamina () {
    this.set('perfectStamina', this.get('stats').stamina === 15)
  }

  _setSprite () {
    this.set('sprite', '//assets.pokemon.com/assets/cms2/img/pokedex/detail/' + (this.get('displayNo') || 132) + '.png')
  }

  _setStats () {
    let stats = this.get('stats')
//
    let baseAttack = 2 * Math.round(Math.sqrt(stats.base.attack * stats.special.attack) + Math.sqrt(stats.speed))
    let baseDefense = 2 * Math.round(Math.sqrt(stats.base.defense * stats.special.defense) + Math.sqrt(stats.speed))
    let baseStamina = 2 * stats.hp.max

    let fullAttack = Math.round((baseAttack + stats.iv.attack) * stats.cpMultiplier)
    let fullDefense = Math.round((baseDefense + stats.iv.defense) * stats.cpMultiplier)
    let fullStamina = Math.round((baseStamina + stats.iv.stamina) * stats.cpMultiplier)

    this.set('attack', fullAttack)
    this.set('defense', fullDefense)
    this.set('stamina', fullStamina)

    this._setPerfect()
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
            let candies = this.get('candies')

            candies.set('count', candies.get('count') + response.candies)

            this.set(response.data.pokemon)
            this.collection.sort()
            this.set('evolving', false)

            resolve()
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

    let candiesCollection = this.appChannel.request('candies')

    if (candiesCollection.length) {
      this._getCandy()

    } else {
      this.listenToOnce(candiesCollection, 'sync', this._getCandy)
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
            this.set(response.data)
            this.collection.sort()
            this.set('poweringUp', false)

            resolve()
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
            let candies = this.get('candies')
            candies.set('count', candies.get('count') + response.candies)

            this.collection.remove(this)

            resolve()
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
      attack: 9001,
      candyCount: 0,
      canEvolve: false,
      canPowerUp: true,
      defense: 9001,
      displayNo: '132',
      egg: false,
      evolving: false,
      famild_id: 132,
      level: 9001,
      loaded: false,
      name: 'MISSINGNO.',
      no: 132,
      pokedex: null,
      poweringUp: false,
      sprite: '//pokeapi.co/media/sprites/pokemon/132.png',
      stamina: 9001,
      transferring: false,
      upgrades: 0
    }
  }

  get idAttribute () {
    return 'longID'
  }

  get pokedex () {
    return Backbone.Radio.channel('application').request('pokedex')
  }
}
