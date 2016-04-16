"use strict";

const InstagramInterface = require("../interfaces/instagram_interface");

class HomeController {
  index(conn) {
    let instagram = new InstagramInterface();
    let authUrl = instagram.authorizationUrl();
    let flash = conn.session.flash || [];
    let flashMessage = flash.shift();

    return conn.render("home/index", { flash: flashMessage, instagram_auth_url: authUrl });
  }
}

module.exports = HomeController;
