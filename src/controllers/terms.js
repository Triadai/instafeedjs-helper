"use strict";

class TermsController {
  index(conn) {
    return conn.render("terms/index");
  }
}

module.exports = TermsController;
