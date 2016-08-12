import Backbone from 'backbone'





Backbone.Marionette.Region.prototype.show = function(view, options) {
  var _shouldDestroyView,
      _shouldReplaceElement,
      _shouldShowView,
      attachedRegion,
      attachOptions,
      displayedViews,
      forceShow,
      isChangingView,
      isDifferentView,
      preventDestroy,
      replaceElement,
      showOptions

  if (!this._ensureElement()) {
    return
  }

  this._ensureViewIsIntact(view)
  Backbone.Marionette.MonitorDOMRefresh(view)

  showOptions = options || {}
  isDifferentView = view !== this.currentView
  preventDestroy = !!showOptions.preventDestroy
  forceShow = !!showOptions.forceShow
  replaceElement = !!showOptions.replaceElement

  // We are only changing the view if there is a current view to change to begin with
  isChangingView = !!this.currentView

  // Only destroy the current view if we don't want to `preventDestroy` and if
  // the view given in the first argument is different than `currentView`
  _shouldDestroyView = isDifferentView && !preventDestroy

  // Only show the view given in the first argument if it is different than
  // the current view or if we want to re-show the view. Note that if
  // `_shouldDestroyView` is true, then `_shouldShowView` is also necessarily true.
  _shouldShowView = isDifferentView || forceShow

  _shouldReplaceElement = replaceElement

  if (isChangingView) {
    this.triggerMethod('before:swapOut', this.currentView, this, options)
  }

  if (this.currentView && isDifferentView) {
    delete this.currentView._parent
  }

  if (_shouldDestroyView) {
    this.empty()

  // A `destroy` event is attached to the clean up manually removed views.
  // We need to detach this event when a new view is going to be shown as it
  // is no longer relevant.
  } else if (isChangingView && _shouldShowView) {
    this.currentView.off('destroy', this.empty, this)
  }

  if (_shouldShowView) {
    // We need to listen for if a view is destroyed
    // in a way other than through the region.
    // If this happens we need to remove the reference
    // to the currentView since once a view has been destroyed
    // we can not reuse it.
    view.once('destroy', this.empty, this)

    // make this region the view's parent,
    // It's important that this parent binding happens before rendering
    // so that any events the child may trigger during render can also be
    // triggered on the child's ancestor views
    view._parent = this
    this._renderView(view)

    if (isChangingView) {
      this.triggerMethod('before:swap', view, this, options)
    }

    this.triggerMethod('before:show', view, this, options)
    Backbone.Marionette.triggerMethodOn(view, 'before:show', view, this, options)

    if (isChangingView) {
      this.triggerMethod('swapOut', this.currentView, this, options)
    }

    // An array of views that we're about to display
    var attachedRegion = Backbone.Marionette.isNodeAttached(this.el)

    // The views that we're about to attach to the document
    // It's important that we prevent _getNestedViews from being executed unnecessarily
    // as it's a potentially-slow method
    var displayedViews = []

    var attachOptions = _.extend({
      triggerBeforeAttach: this.triggerBeforeAttach,
      triggerAttach: this.triggerAttach
    }, showOptions)

    if (attachedRegion && attachOptions.triggerBeforeAttach) {
      displayedViews = this._displayedViews(view)
      this._triggerAttach(displayedViews, 'before:')
    }

    this.attachHtml(view, _shouldReplaceElement)
    this.currentView = view

    if (attachedRegion && attachOptions.triggerAttach) {
      displayedViews = this._displayedViews(view)
      this._triggerAttach(displayedViews)
    }

    if (isChangingView) {
      this.triggerMethod('swap', view, this, options)
    }

    this.triggerMethod('show', view, this, options)
    Backbone.Marionette.triggerMethodOn(view, 'show', view, this, options)

    return this;
  }

  return this;
}

Backbone.Marionette.Region.prototype._replaceEl = function(view) {
  var parent

  // empty el so we don't save any non-destroyed views
  this.$el.contents().detach()

  // always restore the el to ensure the regions el is
  // present before replacing
  this._restoreEl()

  parent = this.el.parentNode
  parent.replaceChild(view.el, this.el)
  this.replaced = true
}

Backbone.Marionette.Region.prototype._restoreEl = function() {
  var parent, view

  if (!this.currentView) {
    return
  }

  view = this.currentView
  parent = view.el.parentNode

  if (!parent) {
    return
  }

  parent.replaceChild(this.el, view.el)
  this.replaced = false
}

Backbone.Marionette.Region.prototype.attachHtml = function(view) {
  if (arguments[1]) {
    this._replaceEl(view)

  } else {
    this.$el.contents().detach();
    this.el.appendChild(view.el)
  }
}

Backbone.Marionette.Region.prototype.empty = function(options) {
  var emptyOptions, preventDestroy, view

  view = this.currentView

  emptyOptions = options || {}
  preventDestroy  = !!emptyOptions.preventDestroy

  // If there is no view in the region
  // we should not remove anything
  if (!view) {
    return this
  }

  view.off('destroy', this.empty, this)
  this.triggerMethod('before:empty', view)

  if (this.replaced) {
    this._restoreEl()
  }

  if (!preventDestroy) {
    this._destroyView()
  }

  this.triggerMethod('empty', view)

  // Remove region pointer to the currentView
  delete this.currentView

  if (preventDestroy) {
    this.$el.contents().detach();
  }

  return this
}
