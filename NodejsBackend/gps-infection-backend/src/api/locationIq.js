const axios = require("axios");
const url = "https://us1.locationiq.com/v1/reverse.php";

exports.findLocation = async function (latitude, longitude) {
  return new Promise(function (resolve, reject) {
    axios
      .get(url, {
        params: {
          key: process.env.apiKeyLocationIq,
          lat: latitude,
          lon: longitude,
          format: "json",
        },
      })
      .then(function (response) {
        console.log(response.status);
        console.log("New register to user");
        console.log("location:");
        console.log(response.data.display_name);
        resolve(response.data.address);
      })
      .catch((error) => {
        console.log("error:", error.message);
        resolve({error:error});
      });
  });
};
