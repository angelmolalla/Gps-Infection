const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressHandle = require("express-handlebars");

//Initializations
const app = express();
require("./config/database");
require("./config/passport")(passport);
require("./model/users.model");

//settings
//Enable CORS for all HTTP methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  expressHandle({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");
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
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use(require("./routes/index"));
app.use(require("./routes/users"));
app.use(require("./routes/state"));
app.use(require("./routes/county"));
app.use(require("./routes/registryPositive"));
app.use(require("./routes/registryDeath"));
//Static Files
app.use(express.static(path.join(__dirname, "public")));
//Server init
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
