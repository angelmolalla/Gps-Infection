const nodemailer = require("nodemailer");
const fs = require("fs");
const mustache = require("mustache");
const path = require("path");
const pathToKey = path.join(__dirname, "..", "/helpers/verificationUser.html");
const htmlStream = fs.readFileSync(pathToKey).toString();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "gpsinfection@gmail.com",
    clientId: process.env.clientIdGmail,
    clientSecret: process.env.clientSecretGmail,
    refreshToken: process.env.refreshTokenGmail,
  },
});

exports.sendEmail = async function (user) {
  return new Promise(function (resolve, reject) {
    const view = {
      system: {
        url: `http://${process.env.DB_HOST}:${process.env.PORT}${process.env.pathUserVerification}/${user._id}`,
      },
      user: { name: user.name },
    };
    const verificationUserHtml = mustache.render(htmlStream, view);

    transporter.sendMail(
      {
        from: "GPS-INFECTION <gpsinfection@gmail.com>",
        to: user.email,
        subject: "Verification user",
        html: verificationUserHtml,
      },
      function (err, res) {
        if (res) {
          console.log("Email Sent: " + user.email);
          resolve(res);
        }
        if (err) {
          console.log("Error: Email: " + err);
          resolve(err);
        }
      }
    );
  });
};
