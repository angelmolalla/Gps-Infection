exports.validateCreateUser = function (user) {
  let errors = [];
  let { name, email, password, confirm_password, latitude, longitude } = user;

  if (!name) errors.push({ text: "Please write a Name" });
  if (!email) errors.push({ text: "Please write a Email" });
  if (!password) errors.push({ text: "Please write a Password" });
  if (!confirm_password)
    errors.push({ text: "Please write a Confirm Password" });
  if (!latitude) errors.push({ text: "Please write a Latitude" });
  if (!longitude) errors.push({ text: "Please write a Longitude" });

  if (confirm_password != password)
    errors.push({ text: "Password do not match" });
  if (password.length < 4)
    errors.push({ text: "Password must be at least 4 characters" });

  return errors;
};

exports.validateLogin = function (user) {
  let errors = [];
  let { email, password } = user;

  if (!email) errors.push({ text: "Please write a Email" });
  if (!password) errors.push({ text: "Please write a Password" });
  return errors;
};
