const User = require("../model/users.model");
const locationIq = require("../api/locationIq");
const nodemailer = require("../api/nodemailer");
const moment = require("moment");
const utils = require("../helpers/utils");
const userValidation = require("../validation/user.validation");
const geolocationValidation = require("../validation/geolocation.validation");

exports.create = async (req, res, next) => {
  let errors = {};
  if (!req.body) {
    return res.status(400).send({
      typeError: "Error empty data",
      error: "User content can not be empty",
    });
  }
  errors = userValidation.validateCreateUser(req.body);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }
  let { name, email, password, latitude, longitude } = req.body;
  let emailUser = await User.findOne({ email: email });
  if (emailUser) {
    return res.status(406).send({
      typeError: "Error incorrect data",
      error: "The email is already in use",
    });
  }
  let geo = await locationIq.findLocation(latitude, longitude);
  errors = geolocationValidation.validateCoordinates(geo);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
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
      nodemailer.sendEmail(newUser);
      res.send(dataUser);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while creating the User.",
      });
    });
};

exports.login = async (req, res) => {
  let errors = {};
  if (!req.body) {
    return res.status(400).send({
      typeError: "Error empty data",
      error: "User content can not be empty",
    });
  }
  errors = userValidation.validateLogin(req.body);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
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
        res.status(401).json({
          success: false,
          typeError: "Error incorrect data",
          error: "you entered the wrong password",
        });
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
        typeError: "Error internal server",
        error: err.message || "Something wrong while get User",
      });
    });
};

exports.verificationUser = async (req, res) => {
  nodemailer.sendEmail();
}
  
exports.findByEmail = async (req, res) => {
  let email = req.params.email;
  if (!email) {
    return res.status(404).send({
      typeError: "Error empty data",
      error: "Please write a Email",
    });
  }
  User.findOne({ email: email })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while get User",
      });
    });
};