var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProfileSchema = new Schema({
  user: String,
  department: String,
  cart: [{
    item: {
      cartegraphID: Number,
      itemName: String,
      itemType: String,
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

var OrderSchema = new Schema({
  user: String,
  department: String,
  location: String,
  comments: String,
  emergencyOrder: Boolean,
  emergencyJustification: String,
  narcanCases: Boolean,
  narcanAdministeredUnknown: String,
  miscItems: String,
  items: [{
    item: {
      cartegraphID: Number,
      itemName: String,
      itemType: String,
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
    department: null
  },
  collection: 'orders'
})
var Order = mongoose.model('Order', OrderSchema)

module.exports = {
  UserProfile,
  Order
}