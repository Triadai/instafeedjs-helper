'use strict';

const url = require("url");
const request = require("request-promise");

const INSTAGRAM_CLIENT_ID     = process.env.INSTAGRAM_CLIENT_ID;
const INSTAGRAM_REDIRECT_URI  = process.env.INSTAGRAM_REDIRECT_URI;
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;

class InstagramInterface {
  authorizationParams(config) {
    let options       = config || {};
    let authScopes    = options.scopes || [ "basic" ];
    let scopesParam   = authScopes.join("+");

    return {
      response_type:  "code",
      scope:          scopesParam,
      client_id:      INSTAGRAM_CLIENT_ID,
      redirect_uri:   INSTAGRAM_REDIRECT_URI
    };
  }

  authorizationUrl(options) {
    return url.format({
      protocol:   "https",
      host:       "api.instagram.com",
      pathname:   "/oauth/authorize",
      query:      this.authorizationParams(options)
    });
  }

  oauthToken(code) {
    let requestUri = url.format({
      protocol:   "https",
      host:       "api.instagram.com",
      pathname:   "/oauth/access_token"
    });

    let requestForm = {
      code:           code,
      grant_type:     "authorization_code",
      client_id:      INSTAGRAM_CLIENT_ID,
      client_secret:  INSTAGRAM_CLIENT_SECRET,
      redirect_uri:   INSTAGRAM_REDIRECT_URI
    };

    return request({
      uri: requestUri,
      method: 'post',
      form: requestForm
    });
  }

}

module.exports = InstagramInterface;
