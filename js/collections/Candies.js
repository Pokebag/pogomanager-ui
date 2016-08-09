import _ from 'underscore'

import Backbone from 'backbone'
import BaseCollection from 'collections/Base'





export default class Candies extends BaseCollection {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get idAttribute () {
    return 'famild_id'
  }

  get url () {
    return '/api/candies'
  }
}
