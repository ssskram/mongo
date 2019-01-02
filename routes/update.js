
// PUT endpoints

const express = require('express')
const router = express.Router()
const checkToken = require('../token')

// update doc
router.post('/document',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
        // put doc here
    } else res.status(403).end()
  }
)

module.exports = router