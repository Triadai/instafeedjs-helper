"use strict";

class HomeController {
  index(conn) {
    return conn.render("home/index");
  }
}

module.exports = HomeController;
