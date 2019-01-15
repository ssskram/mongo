// GET endpoints

const express = require('express')
const router = express.Router()
const checkToken = require('../token')
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

      // let data = []
      // let cursor = await Order.find({})
      // cursor.forEach(or => {
      //   data.push(or)
      // })
      // res.status(200).send(data).end()

      await Order.find({}, {
        isGetMore: false
      }, (err, orders) => {
        if (err) return {}
        res.status(200).send(orders).end()
      })
    } else res.status(403).end()
  }
)

module.exports = router