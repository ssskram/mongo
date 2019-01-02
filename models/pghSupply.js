var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProfileSchema = new Schema({
  user: String,
  department: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  shardKey: {
    user: null
  },
  collection: 'userProfiles'
})

var UserProfile = mongoose.model('UserProfile', ProfileSchema)

module.exports = UserProfile