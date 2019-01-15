// GET endpoints

const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const assert = require('assert')
var MongoClient = require('mongodb').MongoClient
var url = process.env.MONGODB_URI_2

const {
  UserProfile,
  Order
} = require('../models/pghSupply')


// get user profile
router.get('/userProfile',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      UserProfile.findOne({
        user: req.query.user
      }, (err, user) => {
        if (err) res.status(500).send(err)
        else if (!user) res.status(404).end()
        else res.status(200).send(user)
      })
    } else res.status(403).end()
  }
)

// get all orders
router.get('/allOrders',
  async function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      const docs = []
      var findFamilies = function (db, callback) {
        var cursor = db.collection('orders').find()
        cursor.each(function (err, doc) {
          assert.equal(err, null)
          if (doc != null) {
            docs.push(doc)
          } else {
            callback()
          }
        })
      }

      MongoClient.connect(url, function (err, client) {
        assert.equal(null, err)
        var db = client.db('pghsupply')
        findFamilies(db, function () {
          client.close()
          res.status(200).send(docs).end()
        })
      })

    } else res.status(403).end()
  }
)

module.exports = router