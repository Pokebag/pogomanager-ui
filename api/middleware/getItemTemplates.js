'use strict'

let pogobuf = require('pogobuf')





function * getItemTemplates (next) {
  let templates = yield this.state.client.downloadItemTemplates()

  this.state.templates = pogobuf.Utils.splitItemTemplates(templates)

  yield next
}





module.exports = function () {
  return getItemTemplates
}
