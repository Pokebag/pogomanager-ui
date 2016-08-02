import _ from 'underscore'

import Backbone from 'backbone'
import BaseCollection from 'collections/Base'
import Mon from 'models/Mon'





export default class Pokemon extends BaseCollection {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {}





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return model.get('no')
  }

  initialize () {
    this._bindEvents()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return Mon
  }

  get pokedex () {
    return Backbone.Radio.channel('application').request('pokedex')
  }

  get url () {
    return '/api/pokemon'
  }
}
