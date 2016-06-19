// OK here we are trying to write frisby specs for the Instagram API!

// Example request to users endpoint
// https://api.instagram.com/v1/users/{user-id}/?access_token=ACCESS-TOKEN

// Instagram does not support client_credentials grant type
// So usual user auth flow must be supported here

var frisby = require('frisby')

    // for user auth endpoint 
var auth_domain   = 'https://instagram.com/oauth/authorize/',
    client_id       = 'e0aa67fc97464bc7ac6baffdc7766eea',
    redirect_uri    = 'http://rebootsq.org';
    
    // for api query endpoint
var api_domain          = 'https://api.instagram.com/v1/',
    user_id         = 639837,
    userQueryUrl    = 'users/' + user_id + "/",
    access_token    = "282399208.e0aa67f.3a2309088f8f4e0f99a49801421fdfa1";

frisby.create('OAuth2 token request')
  .get(auth_domain, {
    response_type: 'code',
    client_id: client_id,
    redirect_uri: redirect_uri
  })
  .expectStatus(200)
  .toss();

frisby.create('Get AirBnB data')
  .get(api_domain + userQueryUrl + "?access_token="+access_token)
  //access token passed as URL param rather than header.
  .expectStatus(200)
  .expectJSONTypes({
    id: String,
    username: String,
    counts: Object
  })
  // this is some of what the response should hold
  .expectJSON("data", {
      id: user_id,
      username: "airbnb",
      counts: {
        media: Number,
        follows: Number,
        followed_by: Number
      }
  })
  .toss()
