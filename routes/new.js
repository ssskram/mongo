// POST endpoints

const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const UserProfile = require('../models/pghSupply')

// creates a new userProfile for users on PGH Supply
router.post('/userProfile',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            var newProfile = new UserProfile(req.body)
            await newProfile.save(err => {
                if (err) res.status(500).send(err)
                else res.status(200).end()
            })
        } else res.status(403).end()
    }
)

module.exports = router