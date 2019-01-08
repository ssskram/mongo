var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProfileSchema = new Schema({
  user: String,
  department: String,
  cart: [{
    item: {
      cartegraphID: String,
      name: String,
      type: String,
      department: String,
    },
    quantity: Number
  }],
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