const State = require("../model/state.model");

exports.updateStatePositive = function (state) {
  return new Promise(function (resolve, reject) {
    State.updateOne(
      { idState: state.idState },
      { positiveGovernmentState: state.positiveGovernmentState }
    )
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        resolve(err);
      });
  });
};

exports.updateStateDeath = function (state) {
  return new Promise(function (resolve, reject) {
    State.updateOne(
      { idState: state.idState },
      { deadGovernmentState: state.deadGovernmentState }
    )
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        resolve(err);
      });
  });
};

exports.findId = async function (state) {
  return new Promise(function (resolve, reject) {
    State.findOne({ idState: state.idState })
      .then((data) => {
        if (!data) resolve(null);
        resolve(data);
      })
      .catch((err) => {
        resolve(null);
      });
  });
};
