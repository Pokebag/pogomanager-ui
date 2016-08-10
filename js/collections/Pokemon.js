import _ from 'underscore'

import Backbone from 'backbone'
import BaseCollection from 'collections/Base'
import Mon from 'models/Mon'





export default class Pokemon extends BaseCollection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (mon0, mon1) {
    let no = [mon0.get('no'), mon1.get('no')]
    let cp = [mon0.get('cp'), mon1.get('cp')]

    if (no[0] > no[1]) {
      return 1
    }

    if (no[0] < no[1]) {
      return -1
    }

    // If the mons are the same species, sort by CP
    if (no[0] === no[1]) {
      if (cp[0] > cp[1]) {
        return -1
      }
      if (cp[0] < cp[1]) {
        return 1
      }

      return 0
    }
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
