import _ from 'underscore'
import Backbone from 'backbone'
import moment from 'moment'

import BaseCollection from 'collections/Base'
import Tweet from 'models/Tweet'

import config from '../../config.json'





export default class Tweets extends BaseCollection {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.socket.onmessage = this.onMessage.bind(this)

    this.on('add', this._limit)
  }

  _limit () {
    if (this.length > 10) {
      this.remove(this.min((model) => {
        return model.get('created_at')
      }))
    }
  }

  _processQueue () {
    if (this.queue.length) {
      this.add(this.queue.pop())
    }
  }

  _renderEntities (text, entities) {
    let allEntities = []

    if (entities['hashtags']) {
      allEntities = allEntities.concat(this._renderHashtags(entities['hashtags']))
    }

    if (entities['media']){
      allEntities = allEntities.concat(this._renderURLs(entities['media']))
    }

    if (entities['urls']){
      allEntities = allEntities.concat(this._renderURLs(entities['urls']))
    }

    if (entities['user_mentions']){
      allEntities = allEntities.concat(this._renderUserMentions(entities['user_mentions']))
    }

    allEntities.sort((a, b) => {
      let start1 = a.start
      let start2 = b.start

      if (start1 < start2) {
        return 1
      }

      if (start1 > start2) {
        return -1
      }

      return 0
    })

    allEntities.forEach((entity) => {
      text = text.substring(0, entity.start) + entity.replacement + text.substring(entity.end)
    })

    return text
  }

  _renderHashtag (hashtag) {
    return {
      end: hashtag.indices[1],
      replacement: `<a href="http://twitter.com/hashtag/${hashtag.text}">#${hashtag.text}</a>`,
      start: hashtag.indices[0]
    }
  }

  _renderHashtags (hashtags) {
    let ret = []

    hashtags.forEach((hashtag) => {
      ret.push(this._renderHashtag(hashtag))
    })

    return ret
  }

  _renderURL (url) {
    return {
      end: url.indices[1],
      replacement: `<a href="${url.expanded_url}">${url.display_url}</a>`,
      start: url.indices[0]
    }
  }

  _renderURLs (urls) {
    let ret = []

    urls.forEach((url) => {
      ret.push(this._renderURL(url))
    })

    return ret
  }

  _renderUserMention (userMention) {
    return {
      end: userMention.indices[1],
      replacement: `<a href="http://twitter.com/${userMention.screen_name}">@${userMention.screen_name}</a>`,
      start: userMention.indices[0]
    }
  }

  _renderUserMentions (userMentions) {
    let ret = []

    userMentions.forEach((userMention) => {
      ret.push(this._renderUserMention(userMention))
    })

    return ret
  }

  _startQueue () {
    let interval = setInterval(() => {
      if (this.scheduler) {
        clearInterval(interval)

        this.scheduler.schedule('processTweets', this._processQueue, {
          context: this,
          framerate: 30
        })
      }
    }, 50)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  comparator (model) {
    return -model.get('created_at')
  }

  constructor (models, options) {
    super(models, options)

    this.queue = []

    try {
      this.socket = new WebSocket(this.url)
      this._bindEvents()
      this._startQueue()

    } catch (error) {
      this.trigger('error', error)
    }
  }

  onMessage (event) {
    let data = JSON.parse(event.data)

    if (data.status == 200) {
      this.queue.push(this.parse(data.message))
      this.queue = _.sortBy(this.queue, (model) => {
        return -model.created_at
      })

    } else {
      this.trigger('error', data)
    }
  }

  parse (tweet) {
    if (typeof tweet === 'string') {
      tweet = JSON.parse(tweet)
    }

    let adorableAvatar = `//api.adorable.io/avatars/48/${tweet.user.screen_name}.png`
    let eightBitAvatar = `//eightbitavatar.herokuapp.com/?id=${tweet.user.screen_name}&s=male&size=48`

    let created_at = moment(new Date(tweet.created_at))

    let ret = {
      created_at: created_at,
      date: created_at.fromNow(),
      gallery: [],
      id: tweet.id_str,
      media: [],
      raw: tweet,
      renderedText: this._renderEntities(tweet.text, tweet.entities),
      text: tweet.text,
      user: {
        avatar: tweet.user.profile_image_url || adorableAvatar,
        description: tweet.user.description,
        name: tweet.user.name,
        screen_name: tweet.user.screen_name
      }
    }

    if (tweet.extended_entities) {
      tweet.extended_entities.media.forEach((media) => {
        let recognizedMediaTypes = ['photo']

        if (recognizedMediaTypes.indexOf(media.type) === -1) {
          console.error('Unrecognized media type:', media.type)
          return
        }

        media['is' + capitalize(media.type)] = true

        ret.media.push(media)
      })
    }

    return ret
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get model () {
    return Tweet
  }

  get scheduler () {
    return Backbone.Radio.channel('application').request('scheduler')
  }

  get url () {
    return 'ws://' + (config.socket.host || location.hostname) + ':' + (config.socket.port || (location.port ? location.port : '80'))
  }
}
