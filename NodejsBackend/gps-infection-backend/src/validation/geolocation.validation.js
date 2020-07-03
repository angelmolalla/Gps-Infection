exports.validateCoordinates = function (location) {
  let errors = {};
  let { state, county, country, error } = location;

  if (error) {
    errors.status = 500;
    errors.typeError = "Error geolocation";
    errors.data = error.message;
    return errors;
  }
  if (!country) {
    errors.status = 406 ;
    errors.typeError = "Error incorrect data";
    errors.data = "Error consumed API in country";
    return errors;
  }
  if (!state) {
    errors.status = 406 ;
    errors.typeError = "Error incorrect data";
    errors.data = "Error consumed API in state";
    return errors;
  }
  if (!county) {
    errors.status = 406;
    errors.typeError = "Error incorrect data";
    errors.data = "Error consumed API in county";
    return errors;
  } else {
    if (country != "Ecuador") {
      errors.status = 406;
      errors.typeError = "Error incorrect data";
      errors.data = "Error consumed API, the country is not Ecuador";
      return errors;
    }
  }
  return errors;
};
