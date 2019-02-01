// POST/PUT endpoints

const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const {
    UserProfile,
    Order
} = require('../models/pghSupply')

// creates and/or updates a userProfile for users on PGH Supply
router.post('/userProfile',
    function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            UserProfile
                .findOne({
                    user: req.body.user
                })
                .then(user => {
                    if (!user) {
                        var newProfile = new UserProfile(req.body)
                        newProfile.save(err => {
                            if (err) res.status(500).send(err)
                            else res.status(200).end()
                        })
                    } else {
                        user.department = req.body.department
                        user.cart = req.body.cart
                        user.save(err => {
                            if (err) res.status(500).send(err)
                            else res.status(200).end()
                        })
                    }
                })
        } else res.status(403).end()
    }
)

// creates and/or overwrites a cart array within user profile
router.post('/cart',
    function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            UserProfile
                .findOne({
                    user: req.body.user
                })
                .then(user => {
                    if (user) {
                        user.cart = req.body.cart
                        user.save(err => {
                            if (err) res.status(500).send(err)
                            else res.status(200).end()
                        })
                    } else {
                        res.status(404).send()
                    }
                })
        } else res.status(403).end()
    }
)

router.post('/newOrder',
    function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            const newOrder = new Order(req.body)
            newOrder.save(err => {
                if (err) res.status(500).send(err)
                else res.status(200).end()
            })
        } else res.status(403).end()
    }
)

router.post('/updateOrder',
    function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            Order
                .findOne({
                    _id: req.body._id
                })
                .then(order => {
                    if (order) {
                        order.status = req.body.status
                        order.supplyComments = req.body.supplyComments
                        order.receivedBy = req.body.receivedBy
                        order.supplies = req.body.supplies
                        order.save(err => {
                            if (err) res.status(500).send(err)
                            else res.status(200).end()
                        })
                    } else {
                        res.status(404).send()
                    }
                })
        } else res.status(403).end()
    }
)

module.exports = router