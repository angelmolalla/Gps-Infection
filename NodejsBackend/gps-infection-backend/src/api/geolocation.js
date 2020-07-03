const URL = "https://api.opencagedata.com/geocode/v1/json";
const opencage = require("opencage-api-client");

exports.findLocation = async function (latitude, longitude) {
  return new Promise(function (resolve, reject) {
    opencage
      .geocode({
        q: latitude + "," + longitude,
        language: "es",
        key: process.env.apiKeyOpenCage,
      })
      .then((data) => {
        // console.log(JSON.stringify(data));
        if (data.status.code == 200) {
          if (data.results.length > 0) {
            var place = data.results[0];
            resolve(data.results[0].components);
          } else {
            resolve(null);
          }
        } else if (data.status.code == 402) {
          console.log("hit free-trial daily limit");
          reject("hit free-trial daily limit");
        } else {
          console.log("error", data.status.message);
          reject(data.status.message);
        }
      })
      .catch((error) => {
        console.log("error", error.message);
        reject(error.message);
      });
  });
};
