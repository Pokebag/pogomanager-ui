import Backbone from 'backbone'
import marked from 'marked'
import moment from 'moment'

import BaseModel from 'models/Base'





let ratings = ['useless', 'poor', 'average', 'good', 'great', 'excellent']





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

  _setAttackPerfection () {
    let attackIV = this.get('stats').iv.attack
    let perfection = ((attackIV / 15) * 100).toPrecision(3)

    this.set('attackPerfection', perfection)
  }

  _setCandyCount () {
    this.set('candyCount', this.get('candies').get('count'))
  }

  _setCanEvolve () {
    let toEvolve = this.get('toEvolve')

    this.set('canEvolve', toEvolve && toEvolve.candy <= this.get('candies').get('count'))
  }

  _setCanPowerUp () {
    let toPowerUp = this.get('toPowerUp')

    let hasEnoughCandy = this.get('candies').get('count') >= toPowerUp.candy
    let hasEnoughStardust = true

    this.set('canPowerUp', hasEnoughCandy && hasEnoughStardust)
  }

  _setDefensePerfection () {
    let defenseIV = this.get('stats').iv.defense
    let perfection = ((defenseIV / 15) * 100).toPrecision(3)

    this.set('defensePerfection', perfection)
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

  _setPerfection () {
    let stats = this.get('stats')

    this._setAttackPerfection()
    this._setDefensePerfection()
    this._setStaminaPerfection()

    let totalIV = stats.iv.attack + stats.iv.defense + stats.iv.stamina
    let perfection = ((totalIV / 45) * 100).toPrecision(3)

    this.set('perfection', perfection)
    this._setRating()
  }

  _setRating () {
    let perfection = this.get('perfection')
    let rating = ratings[Math.ceil((perfection / 100) * ratings.length) - 1]

    this.set('rating', rating)
  }

  _setSprite () {
    this.set('sprite', '//assets.pokemon.com/assets/cms2/img/pokedex/detail/' + (this.get('displayNo') || 132) + '.png')
  }

  _setStaminaPerfection () {
    let staminaIV = this.get('stats').iv.stamina
    let perfection = ((staminaIV / 15) * 100).toPrecision(3)

    this.set('staminaPerfection', perfection)
  }

  _setStats () {
    let stats = this.get('stats')

    let baseAttack = 2 * Math.round(Math.sqrt(stats.base.attack * stats.special.attack) + Math.sqrt(stats.speed))
    let baseDefense = 2 * Math.round(Math.sqrt(stats.base.defense * stats.special.defense) + Math.sqrt(stats.speed))
    let baseStamina = 2 * stats.hp.max

    let fullAttack = Math.round((baseAttack + stats.iv.attack) * stats.cpMultiplier)
    let fullDefense = Math.round((baseDefense + stats.iv.defense) * stats.cpMultiplier)
    let fullStamina = Math.round((baseStamina + stats.iv.stamina) * stats.cpMultiplier)

    this.set('attack', fullAttack)
    this.set('defense', fullDefense)
    this.set('stamina', fullStamina)

    this._setPerfection()
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

            let toEvolve = this.get('toEvolve')
            let candiesToEvolve = toEvolve.candy || 0

            candies.set('count', candies.get('count') - candiesToEvolve + response.data.candies)

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
            let candies = this.get('candies')

            candies.set('count', candies.get('count') - this.get('toPowerUp').candy)

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

            candies.set('count', candies.get('count') + response.data.candies)

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
      cp: 9001,
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
      rating: ratings[0],
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
