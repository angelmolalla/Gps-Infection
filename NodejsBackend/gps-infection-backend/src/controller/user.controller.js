const User = require("../model/users.model");
const geolocation = require("../api/geolocation");
const moment = require("moment");
const utils = require("../helpers/utils");
const userValidation = require("../validation/user.validation");
const geolocationValidation = require("../validation/geolocation.validation");

exports.create = async (req, res, next) => {
  let errors = [];
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }
  errors = userValidation.validateCreateUser(req.body);
  if (errors.length > 0) {
    return res.send(errors);
  }
  let { name, email, password, latitude, longitude } = req.body;
  let emailUser = await User.findOne({ email: email });
  if (emailUser) {
    return res.status(500).send({
      message: "The email is already in use",
    });
  }
  let geo = await geolocation.findLocation(latitude, longitude);
  errors = geolocationValidation.validateCoordinates(geo);
  console.log("New register to user");
  console.log("location:");
  console.log(geo);
  if (errors.length > 0) {
    return res.send(errors);
  }
  let { state, county } = geo;
  let saltHash = utils.genPassword(password);
  let salt = saltHash.salt;
  let hash = saltHash.hash;

  let newUser = new User({
    name,
    email,
    salt,
    hash,
    latitude,
    longitude,
    county,
    state,
  });
  await newUser
    .save()
    .then((data) => {
      let dataUser = {
        data: data,
        dateLocal: moment(data.date).format("YYYY-MM-DD HH:mm:ss"),
      };
      res.send(dataUser);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the User.",
      });
    });
};

exports.login = async (req, res) => {
  let errors = [];
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }
  errors = userValidation.validateLogin(req.body);
  if (errors.length > 0) {
    return res.send(errors);
  }
  let { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });
      }
      let isValid = utils.validPassword(password, user.hash, user.salt);
      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.findAll = async (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while get User",
      });
    });
};

exports.findByEmail = async (req, res) => {
  let errors = [];
  let email = req.params.email;
  if (!email) errors.push({ text: "Please write a Email" });
  if (errors.length > 0) {
    return res.send(errors);
  }
  User.findOne({ email: email })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while get User",
      });
    });
};
