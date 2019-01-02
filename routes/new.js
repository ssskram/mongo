// POST endpoints

const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const UserProfile = require('../models/pghSupply')

// creates a new userProfile for users on PGH Supply
router.post('/userProfile',
    function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            var newProfile = new UserProfile(req.body);
            console.log(newProfile)
            newProfile.save((err, doc) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(doc)
                }
            })
        } else res.status(403).end()
    }
)

module.exports = router