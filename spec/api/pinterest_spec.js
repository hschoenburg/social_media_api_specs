var frisby = require('frisby')

// domain is what you will replace with your local server url
var domain          = 'https://api.pinterest.com',
    apiUrl          = domain + '/v1',
    client_id       = '4840937341203786780', // insert yours here

    // Here we provide the access token as a given because Pinterest 
    // does not support client_credentials grant grant types.
    access_token    = 'AW-aPu0x4d9cpZLUlzz8npbLsAb5FFlk7-W4oidDLnc3Y4AsEwAAAAA', //insert yours here
    access_token_param = '/?access_token='+access_token,

    // this you will replace with the url of your local server
    oauthTokenUrl   = domain + '/oauth',
    redirect_uri    = 'http://rebootsq.org', //use localhost here
    screen_name     = 'airbnb',
    userQueryUrl    = 'users/',
    fields          = ['first_name','id','counts'],
    fields_param    = '&fields='+fields.join(',');

/* 
 * Like Instagram, Pinterest does not support
 * client_credential style authentication
 * so here is a test for the normal oauth user authorization flow
 * that redirects the user to a page where they can grant
 * the client access.
 */

frisby.create('OAuth2 token request')
  .post(oauthTokenUrl, {
    response_type: 'code',
    client_id: client_id,
    scope: 'read_public',
    redirect_uri: redirect_uri
  })
  .expectStatus(302)
  .toss();

  // This test assumes an access_token has already been granted
  // It users the access_token var from above
 
frisby.create('Get AirBnB data')
  .get(domain + userQueryUrl + screen_name + access_token_param + fields_param)
  // Note: access token is treated as a URL param rather than Header
  .expectStatus(200)
  .expectJSONTypes("data", {
    first_name: String,
    id: String,
    counts: Object
  })
  // This is what the response should look like!
  .expectJSON("data", {
    first_name: "Airbnb",
    counts: {
      pins: Number,
      following: Number,
      followers: Number,
      boards: Number,
      likes: Number
    }
  }).toss();

