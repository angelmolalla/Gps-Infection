const User = require("../model/users.model");
const { search } = require("../routes/users");
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

exports.validateVerificationUser = function (user) {
  let errors = {};
  let { confirmed } = user;
  if (confirmed == false) {
    errors.status = 401;
    errors.typeError = "Error Unauthorized ";
    errors.data = "Please verify the account, through the link in your email ";
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

exports.validateAdminUser = function (user) {
  let errors = {};
  let { admin } = user;

  if (admin == false) {
    errors.status = 426;
    errors.typeError = "Error";
    errors.data = "You do not have permissions for this request";
    return errors;
  }
  return errors;
};

exports.searchUserEmail = function (email) {
  return new Promise(function (resolve, reject) {
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          resolve(null);
        } else {
          resolve(user);
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });
};
