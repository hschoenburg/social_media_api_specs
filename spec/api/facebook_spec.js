// Frisby Spec for the Facebook API
// Slightly different than Twitter

var frisby = require('frisby')

var domain        = 'https://graph.facebook.com/',
    oauthTokenUrl = 'https://graph.facebook.com/oauth/access_token?',
    airBnBPageID  = '324826532457',
    fields        = 'id,name,picture',
    pageQueryUrl  = airBnBPageID + '/?fields=' + fields,

    client_id     = '1565377187089529',
    client_secret = '740f954ca31ad31350285596bea90cdc'

frisby.create('OAuth2 token request')
  .post(oauthTokenUrl, {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: 'client_credentials'
  })
  .expectStatus(200)
  .after(function(err, response, body) {

    //stupid hack because Fb API returns a string 
    //instead of JSON
    var access_token = response.body.split('=')[1]

    frisby.create('Get Facebook Page data')
      .get(domain + pageQueryUrl)
      .addHeader('Authorization', 'Bearer ' + access_token)
      .expectStatus(200)
      .expectJSONTypes({
        id: String,
        name: String,
        picture: Object
      })
      .expectJSON({
          id: airBnBPageID,
          name: "Airbnb",
          picture: {
                "data": {
                  "is_silhouette": false,
                  "url": String
                }
          }

      })
      .afterJSON(function(user_data){
        console.log("FINISHED");
      })
      .toss()
  })
  .toss();

