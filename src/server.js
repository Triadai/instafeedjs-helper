"use strict";

const Pimm = require("pimm");

let server = new Pimm({
  dir: __dirname,
  templating: "haml"
});

server.routes(function() {
  this.get("/", "home#index");
});

server.start().then(function() {
  console.log("app started!");
});
