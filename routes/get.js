
// GET endpoints

const express = require('express')
const router = express.Router()
const checkToken = require('../token')

// gets all docs
router.get('/documents',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
        // get mongo docs here
    } else res.status(403).end()
  }
)

module.exports = router