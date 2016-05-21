"use strict";

const Pimm    = require("pimm");
const dotenv  = require("dotenv");
const path    = require("path");

dotenv.config();

let server = new Pimm({
  dir: __dirname,
  static: path.join(__dirname, "../static"),
  templating: "haml",
  caching: process.env.NODE_ENV === "production",
  session: process.env.SESSION_SECRET || "localdev"
});

server.routes(function() {
  this.get("/", "home#index");
  this.get("/logout", "logout#index");
  this.get("/authorize", "authorization#index");
  this.get("/terms-and-privacy", "terms#index");
});

server.start().then(function() {
  console.log("app started!");
});
