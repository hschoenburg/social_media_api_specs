// OK here we are trying to write frisby specs for the Twitter API!

var frisby = require('frisby')

var domain        = 'https://api.twitter.com/1.1/',
    oauthTokenUrl = 'https://api.twitter.com/oauth2/token',
    userQueryUrl    = 'users/show.json?screen_name='
    screen_name   = 'Airbnb',
    username      = 'bk9usrOLdBAPBMEqLftT3vjsY',
    password      = 'VXl7rpxvfItlWDhfizJrHqvJzS0hmlay49ysgMW8Ogy7Glw3ZH',
    auth          = "Basic " + new Buffer(username + ":" + password).toString('base64');

frisby.create('OAuth2 token request')
  .addHeader('Authorization', auth)
  .addHeader('Accept', 'application/json')
  .post(oauthTokenUrl, {
    grant_type: 'client_credentials'
  })
  .expectStatus(200)
  .afterJSON(function(response) {
    console.log(domain + userQueryUrl + screen_name)
    frisby.create('Get AirBnB data')
      .get(domain + userQueryUrl + screen_name)
      .addHeader('Authorization', 'Bearer ' + response.access_token)
      .expectStatus(200)
      .expectJSONTypes({
        followers_count: Number,
        friends_count: Number,
      })
      .expectJSON({
          screen_name: screen_name,
          id: 17416571, 
      })

      .afterJSON(function(user_data){
        console.log("FINISHED");
      })
      .toss()
  }).
  toss();

