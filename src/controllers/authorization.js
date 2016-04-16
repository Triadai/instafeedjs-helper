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
      conn.json(res);
    });
  }
}

module.exports = AuthorizationController
