// POST/PUT endpoints

const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const UserProfile = require('../models/pghSupply')

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
                            if (err) {
                                console.log(err)
                                res.status(500).send(err)
                            }
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