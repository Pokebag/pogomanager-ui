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
