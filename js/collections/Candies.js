import _ from 'underscore'

import Backbone from 'backbone'
import BaseCollection from 'collections/Base'





export default class Candies extends BaseCollection {

  /******************************************************************************\
    Getters
  \******************************************************************************/

  get url () {
    return '/api/candies'
  }
}
