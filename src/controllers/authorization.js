"use strict";

const InstagramInterface = require("../interfaces/instagram_interface");
const errorMessages = require("../error_messages");

class AuthorizationController {
  index(conn) {
    let instagram   = new InstagramInterface();
    let params      = conn.params || {};
    let authCode    = params.code;
    let errorCode   = params.error;
    let errorReason = params.error_reason;
    let flash       = conn.session.flash || [];

    conn.session.flash = flash

    if (errorCode && errorReason) {
      let errorGroup = errorMessages.instagram[errorCode] || {};
      let errorMessage = errorGroup[errorReason];

      flash.push(errorMessage || errorMessages.instagram.general_auth_error);
      conn.redirect("/");
      return;
    }

    if (!authCode) {
      flash.push(errorMessages.instagram.no_auth_code);
      conn.redirect("/");
      return;
    }

    return instagram.oauthToken(authCode).then((res) => {
      let body        = JSON.parse(res);
      let oauthToken  = body.access_token;
      let user        = body.user || {};
      let userId      = user.id;
      let username    = user.username;

      conn.session.authorized   = true;
      conn.session.userId       = userId;
      conn.session.oauthToken   = oauthToken;
      conn.session.username     = username;

      conn.redirect("/");
    }).catch((err, response, body) => {
      let errorGroup = errorMessages.instagram.token_request || {};
      let errorMessage = errorGroup["" + err.statusCode];

      console.log("Request error converting code to token: " + err.statusCode + ": " + err.response.body);

      flash.push(errorMessage || errorMessages.instagram.general_token_error);
      conn.redirect("/");
    });
  }
}

module.exports = AuthorizationController
