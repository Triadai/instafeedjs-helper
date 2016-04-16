'use strict';

const url = require("url");
const errorMessages = require("../error_messages");

class InstagramInterface {
  authorizationParams(config) {
    let options       = config || {};
    let authScopes    = options.scopes || [ "basic" ];
    let scopesParam   = authScopes.join("+");

    return {
      response_type:  "code",
      scope:          scopesParam,
      client_id:      process.env.INSTAGRAM_CLIENT_ID,
      redirect_uri:   process.env.INSTAGRAM_REDIRECT_URI
    };
  }

  authorizationUrl(options) {
    return url.format({
      protocol:   "https",
      host:       "api.instagram.com",
      pathname:   "/oauth/authorize/",
      query:      this.authorizationParams(options)
    });
  }
}

module.exports = InstagramInterface;
