"use strict";

const Pimm = require("pimm");
const dotenv = require("dotenv");

dotenv.config();

let server = new Pimm({
  dir: __dirname,
  templating: "haml",
  session: process.env.SESSION_SECRET || "localdev"
});

server.routes(function() {
  this.get("/", "home#index");
  this.get("/logout", "logout#index");
  this.get("/authorize", "authorization#index");
});

server.start().then(function() {
  console.log("app started!");
});
