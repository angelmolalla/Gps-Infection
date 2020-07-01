const helpers = {};
helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("no autorizado");
  }
};

module.exports = helpers;
