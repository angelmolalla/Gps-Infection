const userValidation = require("../validation/user.validation");
const State = require("../model/state.model");
const stateValidation = require("../validation/state.validation");
const StateService = require("../service/state.service");
const CountyService = require("../service/county.service");
const RegistryPositiveService = require("../service/registryPositive.service");
const RegistryDeathService = require("../service/registryDeath.service");
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

  let { idState, nameState } = req.body;
  let state = await State.findOne({ idState });
  if (state) {
    return res.status(406).send({
      typeError: "Error incorrect data",
      error: "The id is already in state",
    });
  }
  let newState = new State({ idState, nameState });
  console.log(newState);
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

exports.sendReportPositive = async (req, res, next) => {
  let user = req.user;
  let registryStatePositive = {};
  let registryCountyPositive = {};
  let errors = {};
  let { states } = req.body;
  errors = await stateValidation.validateStatePositive(states);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }

  for (let state of states) {
    registryStatePositive = {};
    await StateService.updateStatePositive(state);
    let stateDatabase = await StateService.findId(state);

    registryStatePositive.idCollection = state.idState;
    registryStatePositive.typeCollection = "state";
    registryStatePositive.nameCollection = stateDatabase.nameState;
    registryStatePositive.valuePositive = state.positiveGovernmentState;
    registryStatePositive.nameProcess = "statePositive";
    registryStatePositive.nameUser = user.name;
    registryStatePositive.emailUSer = user.email;
    await RegistryPositiveService.save(registryStatePositive);

    let counties = state.counties;
    for (let county of counties) {
      registryCountyPositive = {};
      await CountyService.updateCountyPositive(county);
      let countyDatabase = await CountyService.findId(county);

      registryCountyPositive.idCollection = county.idCounty;
      registryCountyPositive.typeCollection = "county";
      registryCountyPositive.nameCollection = countyDatabase.nameCounty;
      registryCountyPositive.valuePositive = county.positiveGovernmentCounty;
      registryCountyPositive.nameProcess = "countyPositive";
      registryCountyPositive.nameUser = user.name;
      registryCountyPositive.emailUSer = user.email;
      await RegistryPositiveService.save(registryCountyPositive);
    }
  }

  res.send(states);
};

exports.sendReportDeath = async (req, res, next) => {
  let user = req.user;
  let registryStateDeath = {};
  let errors = {};
  let { states } = req.body;
  errors = await stateValidation.validateStateDeath(states);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }
  for (let state of states) {
    registryStateDeath = {};
    await StateService.updateStateDeath(state);
    let stateDatabase = await StateService.findId(state);
    registryStateDeath.idCollection = state.idState;
    registryStateDeath.typeCollection = "state";
    registryStateDeath.nameCollection = stateDatabase.nameState;
    registryStateDeath.valueDeath = state.deadGovernmentState;
    registryStateDeath.nameProcess = "stateDeath";
    registryStateDeath.nameUser = user.name;
    registryStateDeath.emailUSer = user.email;
    await RegistryDeathService.save(registryStateDeath);
  }
  res.send(states);
};
exports.update = async (req, res, next) => {
  let errors = {};
  let idState = req.params.id;
  let { nameState } = req.body;
  errors = userValidation.validateAdminUser(req.user);
  if (errors.data) {
    return res.status(errors.status).send({
      typeError: errors.typeError,
      error: errors.data,
    });
  }
  let newState = await State.findOne({ idState });
  newState.nameState = nameState;

  State.updateOne({ idState }, newState)
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
  let idState = req.params.id;
  if (!idState) {
    return res.status(404).send({
      typeError: "Error empty data",
      error: "Please write a id",
    });
  }

  State.findOne({ idState })
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
