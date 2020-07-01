const User = require("../model/users.model");
const Geolocation = require("../api/geolocation");
var moment = require("moment");
const utils = require("../config/utils");
exports.create = async (req, res) => {
  const errors = [];
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  const {
    name,
    email,
    password,
    confirm_password,
    latitude,
    longitude,
  } = req.body;

  console.log(req.body);
  if (!name) errors.push({ text: "Please write a Name" });
  if (!email) errors.push({ text: "Please write a Email" });
  if (!password) errors.push({ text: "Please write a Password" });
  if (!confirm_password)
    errors.push({ text: "Please write a Confirm Password" });
  if (!latitude) errors.push({ text: "Please write a Latitude" });
  if (!longitude) errors.push({ text: "Please write a Longitude" });

  if (confirm_password != password)
    errors.push({ text: "Password do not match" });
  if (password.length < 4)
    errors.push({ text: "Password must be at least 4 characters" });

  if (errors.length > 0) {
    res.send(errors);
  } else {
    let emailUser = await User.findOne({ email: email });
    if (emailUser) {
      res.status(500).send({
        message: "The email is already in use",
      });
    }
    let geo = await Geolocation.findLocation(latitude, longitude);
    console.log(geo);
    const { state, county, country } = geo;
    if (!state) errors.push({ text: "Error consumed API in state" });
    if (!county) errors.push({ text: "Error consumed API in county" });
    if (!country) errors.push({ text: "Error consumed API in country" });

    const saltHash = utils.genPassword(password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
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
  }
};

exports.findAll = async (req, res) => {
  console.log(req.user);
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
  const errors = [];
  const email = req.params.email;

  if (!email) errors.push({ text: "Please write a Email" });

  if (errors.length > 0) {
    res.send(errors);
  } else {
    User.findOne({ email: email })
      .then((data) => {
        res.send(data);
        console.log(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Something wrong while get User",
        });
      });
  }
};
