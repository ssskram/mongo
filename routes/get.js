// GET endpoints

const express = require("express");
const router = express.Router();
const assert = require("assert");
var MongoClient = require("mongodb").MongoClient;
var url = process.env.MONGODB_URI_2;

const { UserProfile, Order } = require("../models/pghSupply");

// get user profile
router.get("/userProfile", (req, res) => {
  UserProfile.findOne(
    {
      user: req.query.user
    },
    (err, user) => {
      if (err) res.status(500).send(err);
      else if (!user) res.status(404).end();
      else res.status(200).send(user);
    }
  );
});

// get all orders
router.get("/allOrders", async (req, res) => {
  const docs = [];
  var findFamilies = function(db, callback) {
    var cursor = db.collection("orders").find();
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        docs.push(doc);
      } else {
        callback();
      }
    });
  };

  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    var db = client.db("pghsupply");
    findFamilies(db, function() {
      client.close();
      res
        .status(200)
        .send(docs)
        .end();
    });
  });
});

module.exports = router;
