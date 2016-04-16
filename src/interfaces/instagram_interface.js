'use strict';

const url = require("url");

class InstagramInterface {
  authorizationParams() {
    return {
      response_type:  "code",
      client_id:      process.env.INSTAGRAM_CLIENT_ID,
      redirect_uri:   process.env.INSTAGRAM_REDIRECT_URI
    };
  }

  authorizationUrl() {
    return url.format({
      protocol: "https",
      host: "api.instagram.com",
      path: "/oauth/authorize/",
      query: this.authorizationParams()
    });
  }
}

module.exports = InstagramInterface;
