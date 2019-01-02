var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProfileSchema = new Schema({
  content: {
    department: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

var UserProfile = mongoose.model('UserProfile', ProfileSchema)

module.exports = UserProfile