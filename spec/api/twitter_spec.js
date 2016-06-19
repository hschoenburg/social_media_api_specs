// OK here we are trying to write frisby specs for the Twitter API!

var frisby = require('frisby')

var domain        = 'https://api.twitter.com/',
    api_domain    = domain + '1.1/',
    auth_domain   = domain + 'oauth2/token',
    screen_name   = 'Airbnb',
    userQueryUrl  = api_domain + 'users/show.json?screen_name=' + screen_name,
    username      = 'bk9usrOLdBAPBMEqLftT3vjsY',
    password      = 'VXl7rpxvfItlWDhfizJrHqvJzS0hmlay49ysgMW8Ogy7Glw3ZH',
    auth          = "Basic " + new Buffer(username + ":" + password).toString('base64');

  // This first request is for an access token
  // using the client_credentials grant type
frisby.create('OAuth2 token request')
  .addHeader('Authorization', auth)
  .addHeader('Accept', 'application/json')
  .post(auth_domain, {
    grant_type: 'client_credentials'
  })
  .expectStatus(200)
  .afterJSON(function(response) {
    // Ok now that we have our access token lets
    // use the Bearer strategy to request some data!
    frisby.create('Get AirBnB data')
      .get(userQueryUrl)
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

