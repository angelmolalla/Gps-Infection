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
      error: "County content can not be empty",
    });
  }

  let { idCounty, nameCounty, idState } = req.body;
  let state = await State.findOne({ idState: idState });

  if (!state) {
    return res.status(406).send({
      typeError: "Error incorrect data",
      error: "The id state isn't correct",
    });
  }

  let posIdCounty = state.counties
    .map(function (e) {
      return e.idCounty;
    })
    .indexOf(idCounty);
  let posNameCounty = state.counties
    .map(function (e) {
      return e.nameCounty;
    })
    .indexOf(nameCounty);
  if (posIdCounty != -1) {
    return res.status(406).send({
      typeError: "Error incorrect data",
      error: "The id county isn't correct",
    });
  }

  if (posNameCounty != -1) {
    return res.status(406).send({
      typeError: "Error incorrect data",
      error: "The name county isn't correct",
    });
  }

  let newCounty = {};
  newCounty.idCounty = idCounty;
  newCounty.nameCounty = nameCounty;
  state.counties.push(newCounty);

  State.updateOne({ idState }, state)
    .then((data) => {
      res.send(state);
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
  let { nameCounty } = req.body;
  errors = userValidation.validateAdminUser(req.user);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }
  let state = await State.findOne({ "counties.idCounty": id });
  if (!state) {
    return res.status(404).send({
      typeError: "Error Not Found.",
      error: "The county isn't exist",
    });
  }

  let county = state.counties.find((element) => element.idCounty == id);
  county.nameCounty = nameCounty;
  State.updateOne(
    { "counties.idCounty": id },
    {
      $set: { "counties.$.nameCounty": nameCounty },
    }
  )
    .then((data) => {
      return res.send(county);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while creating the State.",
      });
    });
};

exports.changeTrafficLightGovernmentCounty = async (req, res, next) => {
  let errors = {};
  let id = req.params.id;
  let { trafficLight } = req.body;
  errors = userValidation.validateAdminUser(req.user);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }
  let state = await State.findOne({ "counties.idCounty": id });
  if (!state) {
    return res.status(404).send({
      typeError: "Error Not Found.",
      error: "The county isn't exist",
    });
  }

  if (
    trafficLight != "green" &&
    trafficLight != "red" &&
    trafficLight != "yellow"
  ) {
    return res.status(406).send({
      typeError: "Error value not accepted",
      error: "The traffic light value is not: yellow, green or red",
    });
  }

  let county = state.counties.find((element) => element.idCounty == id);
  county.trafficLightGovernmentCounty = trafficLight;
  State.updateOne(
    { "counties.idCounty": id },
    {
      $set: { "counties.$.trafficLightGovernmentCounty": trafficLight },
    }
  )
    .then((data) => {
      return res.send(county);
    })
    .catch((err) => {
      res.status(500).send({
        typeError: "Error internal server",
        error: err.message || "Something wrong while creating the State.",
      });
    });
};
exports.findId = async (req, res, next) => {
  let id = req.params.id;
  let state = await State.findOne({ "counties.idCounty": id });
  if (!state) {
    return res.send({});
  }
  let county = state.counties.find((element) => element.idCounty == id);
  return res.send(county);
};
