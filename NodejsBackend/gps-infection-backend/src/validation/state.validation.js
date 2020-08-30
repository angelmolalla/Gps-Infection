const StateService = require("../service/state.service");
const CountyService = require("../service/county.service");
exports.validateStatePositive = async function (states) {
  let errors = {};
  for (let state of states) {
    let stateResult = await StateService.findId(state);
    if (stateResult == null) {
      errors.status = 406;
      errors.typeError = "Error incorrect data";
      errors.data = "Error consumed API in state: " + state.idState;
      return errors;
    }
    let counties = state.counties;
    for (let county of counties) {
      let countyResult = await CountyService.findId(county);
      if (countyResult == null) {
        errors.status = 406;
        errors.typeError = "Error incorrect data";
        errors.data = "Error consumed API in county: " + county.idCounty;
        return errors;
      }
    }
  }
  return errors;
};

exports.validateStateDeath = async function (states) {
  let errors = {};
  for (let state of states) {
    let stateResult = await StateService.findId(state);
    if (stateResult == null) {
      errors.status = 406;
      errors.typeError = "Error incorrect data";
      errors.data = "Error consumed API in state: " + state.idState;
      return errors;
    }
  }
  return errors;
};
