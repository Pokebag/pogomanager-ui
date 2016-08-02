import marked from 'marked'
import moment from 'moment'

import BaseModel from 'models/Base'





export default class Blog extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.on('change:content', () => {
      this._renderContent()
    })

    this.on('sync', () => {
      this.set('loaded', true)
    })
  }

  _renderContent () {
    let content = this.get('content')

    if (content) {
      try {
        this.set('renderedContent', marked(content) || '')

      } catch (error) {
        this.set('renderedContent', marked('Failed to render the content for this blog. :-('))
        this.trigger('error', error)
      }
    }
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (model, options) {
    super(model, options)

    if (!this.isNew()) {
      this.set('created_at', moment(model.dt_create))
    }

    this.set('raw', model)

    this._bindEvents()
  }

  defaults () {
    return {
      content: '',
      loaded: false,
      renderedContent: ''
    }
  }

  save () {
    options || (options = {})
    attributes || (attributes = _.clone(this.attributes))

    delete attributes.loaded
    delete attributes.renderedContent

    options.data = JSON.stringify(attributes)

    return super.save.call(this, attributes, options)
  }
}
