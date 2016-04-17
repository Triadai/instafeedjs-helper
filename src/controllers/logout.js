"use strict";

class LogoutController {
  index(conn) {
    let flash = conn.session.flash || [];

    conn.session.authorized   = false;
    conn.session.userId       = null;
    conn.session.username     = null;
    conn.session.oauthToken   = null;

    flash.push("Logged out.");

    conn.redirect("/");
  }
}

module.exports = LogoutController;
