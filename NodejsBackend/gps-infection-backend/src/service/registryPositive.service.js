const RegistryPositive = require("../model/registryPositive.model");
exports.save = function (registryPositive) {
  return new Promise(function (resolve, reject) {
    let newRegistryPositive = new RegistryPositive(registryPositive);
    newRegistryPositive
      .save()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};
