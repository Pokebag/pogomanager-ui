import _ from 'underscore'

import Backbone from 'backbone'
import BaseCollection from './Base'





export default class Pokedex extends BaseCollection {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {}





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  getEntry (no) {
    let entry

    if (entry = this.get(no)) {
      return Promise.resolve(entry)

    } else if (this.retrievedEntries[no]) {
      return this.retrievedEntries[no]

    } else {
      return this.retrievedEntries[no] = new Promise((resolve, reject) => {
        $.ajax({
          error: reject,
          url: `//pokeapi.co/api/v2/pokemon-species/${no}`,
          success: (response, status, xhr) => {
            let entries = response.flavor_text_entries

            for (let i = 0; i < entries.length; i++) {
              let entry = entries[i]

              if (entry.language.name === 'en') {
                return resolve(this.add({
                  entry: entry.flavor_text,
                  no: no
                }))
              }
            }

            return reject()
          }
        })
      })
    }
  }

  initialize () {
    this._bindEvents()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get comparator () {
    return 'no'
  }

  get retrievedEntries () {
    return this._retrievedEntries || (this._retrievedEntries = {})
  }
}
