import Backbone from 'backbone'
import 'backbone.base-router'
import 'backbone.hoard'
import 'backbone.intercept'
import 'backbone.marionette'
import 'backbone.radio'
import 'backbone.stickit'
import './shims/backbone.radio'
import './shims/marionette.replaceElement'

import './shims/capitalize'
import './shims/stringToColor'

import App from './App'





$(document).ready(function () {
  // Start the damn thing already
  window.app = new App

  app.start()
})

window.poketable = function (fields) {
  let pokemon = Backbone.Radio.channel('application').request('pokemon').toJSON()

  let poketable = []

  pokemon.forEach(mon => {
    let tablemon = {}

    if (fields) {
      fields.forEach(field => {
        let splitFields = field.split('.')
        let value = mon

        splitFields.forEach(splitField => {
          value = value[splitField]
        })

        tablemon[field] = value
      })

      poketable.push(tablemon)

    } else {
      poketable.push(mon)
    }
  })

  console.table(poketable)
}
