// OK here we are trying to write frisby specs for the Twitter API!

var frisby = require('frisby')

//https://api.pinterest.com/v1/users/airbnb/?access_token=AW-aPu0x4d9cpZLUlzz8npbLsAb5FFlk7-W4oidDLnc3Y4AsEwAAAAA&fields=first_name%2Cid%2Clast_name%2Curl
var domain        = 'https://api.pinterest.com/v1/',
    access_token  = 'AW-aPu0x4d9cpZLUlzz8npbLsAb5FFlk7-W4oidDLnc3Y4AsEwAAAAA',
    access_token_param = '/?access_token='+access_token
    //oauthTokenUrl = 'https://api.twitter.com/oauth2/token',
    screen_name   = 'airbnb',
    userQueryUrl    = 'users/',
    fields          = ['first_name','id','counts'],
    fields_param    = '&fields='+fields.join(',');
    //username      = 'bk9usrOLdBAPBMEqLftT3vjsY',
    //password      = 'VXl7rpxvfItlWDhfizJrHqvJzS0hmlay49ysgMW8Ogy7Glw3ZH',
    //auth          = "Basic " + new Buffer(username + ":" + password).toString('base64');
/* 
 * Like Instagram, Pinterest does not support
 * client_credential style authentication
 * so the access_token will be considered a given here.
 *
frisby.create('OAuth2 token request')
  .addHeader('Authorization', auth)
  .addHeader('Accept', 'application/json')
  .post(oauthTokenUrl, {
    grant_type: 'client_credentials'
  })
  .expectStatus(200)
  .afterJSON(function(response) {
    console.log(domain + userQueryUrl + screen_name)
*/

frisby.create('Get AirBnB data')
  .get(domain + userQueryUrl + screen_name + access_token_param + fields_param)
  //.addHeader('Authorization', 'Bearer ' + response.access_token)
  //access token is treated as a URL param rather than Header
  .expectStatus(200)
  .expectJSONTypes("data", {
    first_name: String,
    id: String,
    counts: Object
  })
  .expectJSON("data", {
    first_name: "Airbnb",
    counts: {
      pins: Number,
      following: Number,
      followers: Number,
      boards: Number,
      likes: Number
    }
  })
  .afterJSON(function(user_data){
    console.log("FINISHED");
  }).
toss();

