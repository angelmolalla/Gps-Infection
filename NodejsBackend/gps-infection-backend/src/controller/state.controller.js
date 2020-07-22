const userValidation = require("../validation/user.validation");
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
      error: "State content can not be empty",
    });
  }

  let { id, name } = req.body;
  let state = await State.findOne({ id: id });
  if (state) {
    return res.status(406).send({
      typeError: "Error incorrect data",
      error: "The id is already in state",
    });
  }
  let newState = new State({ id, name });
  await newState
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while creating the State.",
      });
    });
};

exports.update = async (req, res, next) => {
  let errors = {};
  let id = req.params.id;
  let { name } = req.body;
  errors = userValidation.validateAdminUser(req.user);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }
  let newState = await State.findOne({ id: id });
  newState.name = name;

  State.updateOne({ id: id }, newState)
    .then((data) => {
      res.send(newState);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while creating the State.",
      });
    });
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

  State.findOne({ id: id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while get State",
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

  State.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while get State",
      });
    });
};
