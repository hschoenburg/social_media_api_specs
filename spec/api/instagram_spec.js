// OK here we are trying to write frisby specs for the Instagram API!

//https://api.instagram.com/v1/users/{user-id}/?access_token=ACCESS-TOKEN

var frisby = require('frisby')

/*
    // for token query
var oauthTokenUrl   = 'https://instagram.com/oauth/authorize/',
    client_id       = 'e0aa67fc97464bc7ac6baffdc7766eea',
    redirect_uri    = 'http://rebootsq.org';
*/
    
    // for api query
var domain          = 'https://api.instagram.com/v1/',
    user_id         = 639837,
    userQueryUrl    = 'users/' + user_id + "/";
    access_token    = "282399208.e0aa67f.3a2309088f8f4e0f99a49801421fdfa1";

    //screen_name     = 'Airbnb',
    //username        = 'bk9usrOLdBAPBMEqLftT3vjsY',
    //password        = 'VXl7rpxvfItlWDhfizJrHqvJzS0hmlay49ysgMW8Ogy7Glw3ZH',
    //auth            = "Basic " + new Buffer(username + ":" + password).toString('base64');

//https://instagram.com/oauth/authorize/?response_type=code&client_id=e0aa67fc97464bc7ac6baffdc7766eea&redirect_uri=http://rebootsq.org

/*
frisby.create('OAuth2 token request')
  //.addHeader('Authorization', auth)
  //.addHeader('Accept', 'application/json')
  .get(oauthTokenUrl, {
    response_type: 'code',
    client_id: client_id,
    redirect_uri: redirect_uri
  })
  .expectStatus(200)
  .after(function(response) {
    console.log(response);

  }).toss();
*/

frisby.create('Get AirBnB data')
  .get(domain + userQueryUrl + "?access_token="+access_token)
  //.addHeader('Authorization', 'Bearer ' + response.access_token)
  .expectStatus(200)
  .inspectJSON()
  .expectJSONTypes({
    id: String,
    username: String,
    counts: Object
  })
  .expectJSON("data", {
      id: user_id,
      username: "airbnb",
      counts: {
        media: Number,
        follows: Number,
        followed_by: Number
      }
  })

  .afterJSON(function(user_data){
    console.log("FINISHED");
  })
  .toss()
