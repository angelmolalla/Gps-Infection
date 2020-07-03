const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");

//Initializations
const app = express();
require("./config/database");
require('./config/passport')(passport);
require('./model/users.model');

//settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("port", process.env.PORT || 3000);

//Middleware
require("dotenv").config();
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
//Global variable
app.use((req, res, next) => {
  res.locals.user = req.user||null;
  next();
});

//Routes
app.use(require("./routes/index"));
app.use(require("./routes/users"));

//Server init
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
