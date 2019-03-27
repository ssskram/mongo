const express = require("express");
const bodyParser = require("body-parser");
const bearerToken = require("express-bearer-token");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const checkToken = require("./token");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
global.Headers = fetch.Headers;

// import env variables
require("dotenv").config();

// start express
var app = express();
app.set("port", process.env.PORT || 3000);

// body parser
app.use(bodyParser.json());

// enable cors on all requests
app.use(cors());

// logging
app.use(require("morgan")("combined"));

// docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// bearer token
app.use(bearerToken());

// connect to mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

// access control
app.use((req, res, next) => {
  const valid = checkToken(req.token);
  if (valid == true) {
    next();
  } else {
    res.status(403).end();
  }
});

// routes
app.use("/save", require("./routes/save"));
app.use("/get", require("./routes/get"));

// Production error handler
if (app.get("env") === "production") {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
