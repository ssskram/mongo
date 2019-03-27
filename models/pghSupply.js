var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProfileSchema = new Schema(
  {
    user: String,
    department: String,
    cart: [
      {
        item: {
          cartegraphID: Number,
          itemName: String,
          itemType: String,
          itemUnit: String,
          department: String
        },
        quantity: Number
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    shardKey: {
      user: null
    },
    collection: "userProfiles"
  }
);
var UserProfile = mongoose.model("UserProfile", ProfileSchema);

var OrderSchema = new Schema(
  {
    SPid: Number,
    user: String,
    userName: String,
    department: String,
    location: String,
    comments: String,
    emergencyOrder: Boolean,
    emergencyJustification: String,
    narcanCases: Boolean,
    narcanAdministeredUnknown: String,
    equipmentJustification: String,
    miscItems: String,
    status: String,
    supplyComments: String,
    receivedBy: String,
    supplies: [
      {
        item: {
          cartegraphID: Number,
          itemName: String,
          itemType: String,
          itemUnit: String
        },
        quantityOrdered: Number,
        quantityReceived: Number
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    shardKey: {
      department: null
    },
    collection: "orders"
  }
);
var Order = mongoose.model("Order", OrderSchema);

module.exports = {
  UserProfile,
  Order
};
