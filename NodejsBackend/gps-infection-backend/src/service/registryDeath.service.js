const RegistryDeath = require("../model/registryDeath.model");
exports.save = function (registryDeath) {
  return new Promise(function (resolve, reject) {
    let newRegistryDeath = new RegistryDeath(registryDeath);
    newRegistryDeath
      .save()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};
