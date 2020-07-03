exports.validateCreateUser = function (user) {
  let errors = {};
  let { name, email, password, confirm_password, latitude, longitude } = user;
  if (!name) {
    errors.status = 500;
    errors.typeError = "Error geolocation";
    errors.data = "Please write a Name";
    return errors;
  }
  if (!email) {
    errors.status = 406;
    errors.typeError = "Error empty data";
    errors.data = "Please write a Email";
    return errors;
  }
  if (!password) {
    errors.status = 406;
    errors.typeError = "Error empty data";
    errors.data = "Please write a Password";
    return errors;
  }
  if (!confirm_password) {
    errors.status = 406;
    errors.typeError = "Error empty data";
    errors.data = "Please write a Confirm Password";
    return errors;
  }
  if (!latitude) {
    errors.status = 406;
    errors.typeError = "Error empty data";
    errors.data = "Please write a Latitude";
    return errors;
  }
  if (!longitude) {
    errors.status = 406;
    errors.typeError = "Error empty data";
    errors.data = "Please write a Longitude";
    return errors;
  }
  if (confirm_password != password) {
    errors.status = 406;
    errors.typeError = "Error incorrect data";
    errors.data = "Password do not match";
    return errors;
  }
  if (password.length < 4) {
    errors.status = 406;
    errors.typeError = "Error incorrect data";
    errors.data = "Password must be at least 4 characters";
    return errors;
  }
  return errors;
};

exports.validateLogin = function (user) {
  let errors = {};
  let { email, password } = user;

  if (!email) {
    errors.status = 406;
    errors.typeError = "Error empty data";
    errors.data = "Please write a Email";
    return errors;
  }
  if (!password) {
    errors.status = 406;
    errors.typeError = "Error empty data";
    errors.data = "Please write a Password";
    return errors;
  }
  return errors;
};
