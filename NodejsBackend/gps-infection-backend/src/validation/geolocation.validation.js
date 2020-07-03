exports.validateCoordinates = function (location) {
  let errors = [];
  let { state, county, country } = location;
  if (!country) errors.push({ text: "Error consumed API in country" });
  if (!state) errors.push({ text: "Error consumed API in state" });
  if (!county) errors.push({ text: "Error consumed API in county" });
  else {
    if (country != "Ecuador")
      errors.push({ text: "Error consumed API, the country is not Ecuador" });
  }
  return errors;
};
