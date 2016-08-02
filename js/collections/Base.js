import Backbone from 'backbone'





export default class Base extends Backbone.Collection {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (models, options) {
    super(models, options)

    this.sync = new Backbone.Hoard.Control().getModelSync()
  }

  parse (response) {
    return response.data
  }
}
