const State = require("../model/state.model");

exports.updateCountyPositive = function (county) {
  return new Promise(function (resolve, reject) {
    State.updateOne(
      { "counties.idCounty": county.idCounty },
      {
        $set: {
          "counties.$.positiveGovernmentCounty":
            county.positiveGovernmentCounty,
        },
      }
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

exports.findId = async function (county) {
  return new Promise(function (resolve, reject) {
    State.findOne({ "counties.idCounty": county.idCounty })
      .then((data) => {
        if (!data) resolve(null);
        let countyResult = data.counties.find(
          (element) => element.idCounty == county.idCounty
        );
        if (!countyResult) resolve(null);
        resolve(countyResult);
      })
      .catch((err) => {
        resolve(null);
      });
  });
};
