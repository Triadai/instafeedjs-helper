"use strict";

const InstagramInterface = require("../interfaces/instagram_interface");

class HomeController {
  index(conn) {
    let instagram     = new InstagramInterface();
    let authUrl       = instagram.authorizationUrl();
    let flash         = conn.session.flash || [];
    let flashMessage  = flash.shift();

    let authorized    = conn.session.authorized;
    let userId        = conn.session.userId;
    let username      = conn.session.username;
    let oauthToken    = conn.session.oauthToken;

    return conn.render("home/index", {
      authorized:         authorized,
      userId:             userId,
      oauthToken:         oauthToken,
      username:           username,
      flash:              flashMessage,
      instagram_auth_url: authUrl
    });
  }
}

module.exports = HomeController;
