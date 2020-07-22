const userValidation = require("../validation/user.validation");
const County = require("../model/county.model");
const State = require("../model/state.model");

exports.create = async (req, res, next) => {
  let errors = {};
  errors = userValidation.validateAdminUser(req.user);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }

  if (!req.body) {
    return res.status(400).send({
      typeError: "Error empty data",
      error: "County content can not be empty",
    });
  }

  let { id, name, idState } = req.body;
  let state = await State.findOne({ id: idState });
  let county = await County.findOne({ id: id });
  if (!state) {
    return res.status(406).send({
      typeError: "Error incorrect data",
      error: "The id state isn't correct",
    });
  }
  if (county) {
    return res.status(406).send({
      typeError: "Error incorrect data",
      error: "The id is already in county",
    });
  }

  let newCounty = new County({ id, name, state: state._id });
  await newCounty
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while creating the County.",
      });
    });
};

exports.update = async (req, res, next) => {
  let errors = {};
  errors = userValidation.validateAdminUser(req.user);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }
};

exports.findId = async (req, res, next) => {
  let errors = {};
  errors = userValidation.validateAdminUser(req.user);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }
  let id = req.params.id;
  if (!id) {
    return res.status(404).send({
      typeError: "Error empty data",
      error: "Please write a id",
    });
  }

  County.findOne({ id: id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while get County",
      });
    });
};

exports.findAll = async (req, res, next) => {
  let errors = {};
  errors = userValidation.validateAdminUser(req.user);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }
  console.log(req.user);
  County.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while get County",
      });
    });
};
