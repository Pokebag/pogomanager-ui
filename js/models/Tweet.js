import BaseModel from 'models/Base'





export default class Tweet extends BaseModel {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    response.timestamp = new Date(response.timestamp_ms)
    return response
  }
}
