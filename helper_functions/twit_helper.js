var Twit = require('twit'),

// for OAUTH
twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_SECRET_TOKEN
});

module.exports = {
  // returns the a json object of all the tweets based on that search
  searchByTerm:function(term, callback){
    //create todays date
    var dateObject = new Date(),
    todaysDate = dateObject.getFullYear() + "-" + dateObject.getMonth() + "-" +dateObject.getDate();

    //makes an initial search of the term
    twitter.get('search/tweets', { q: term, since: todaysDate, count: 100 }, function(err, data, response) {
        if(err){
          callback.send(err);// error handling
        }else if(data.statuses.length === 0){
          callback.send({
            "response": false
          });//check to see if anyone used this work ever
        }else{
          
          var stat = data.statuses;
          var newObject = {
            "response": true,
            "tweetCount": 0,
            "max_id": 0,
            "tweetsPerSec":0,
            "tweets":[],
            "completed_times":[]            
          };
  
          for(var i = 0; i < stat.length;i++){
            var formattedData = {
              "tweet_id": stat[i].id,
              "username": stat[i].user.name,
              "screen_name": stat[i].user.screen_name,
              "text": stat[i].text,
              "created_at": stat[i].created_at,
              "total_likes_user_has": stat[i].user.favourites_count,
              "followers": stat[i].user.followers_count,
              "followings": stat[i].user.friends_count,
              "profile_img": stat[i].user.profile_image_url
            };
            newObject.tweets.push(formattedData);
          }//end of for loop

// NOTE!!! below this line is a nesting hell
// NOTE!!! I need to find a way to recursivly do the bottom part.
// NOTE!!! I tried to do it but its not working and stops after the first try


          newObject.completed_times.push(data.search_metadata.completed_in);
          var maxId = data.search_metadata.max_id;

          twitter.get('search/tweets', { q: term, since_id: maxId, count: 100 }, function(err, data, response){
            var stat = data.statuses;

            for(var e = 1; e < stat.length;e++){
              var formattedData = {
                "tweet_id": stat[e].id,
                "username": stat[e].user.name,
                "screen_name": stat[e].user.screen_name,
                "text": stat[e].text,
                "created_at": stat[e].created_at,
                "total_likes_user_has": stat[e].user.favourites_count,
                "followers": stat[e].user.followers_count,
                "followings": stat[e].user.friends_count,
                "profile_img": stat[e].user.profile_image_url
              };
              newObject.tweets.push(formattedData);            
            }//end of for loop
            newObject.completed_times.push(data.search_metadata.completed_in);
            max_id = data.search_metadata.max_id;
            twitter.get('search/tweets', { q: term, since_id: maxId, count: 100 }, function(err, data, response){
              var stat = data.statuses;

              for(var e = 1; e < stat.length;e++){
                var formattedData = {
                  "tweet_id": stat[e].id,
                  "username": stat[e].user.name,
                  "screen_name": stat[e].user.screen_name,
                  "text": stat[e].text,
                  "created_at": stat[e].created_at,
                  "total_likes_user_has": stat[e].user.favourites_count,
                  "followers": stat[e].user.followers_count,
                  "followings": stat[e].user.friends_count,
                  "profile_img": stat[e].user.profile_image_url
                };
                newObject.tweets.push(formattedData);
                
              }//end of for loop
              newObject.completed_times.push(data.search_metadata.completed_in);
              
              max_id = data.search_metadata.max_id;
              twitter.get('search/tweets', { q: term, since_id: maxId, count: 100 }, function(err, data, response){
                var stat = data.statuses;
                for(var e = 1; e < stat.length;e++){
                  var formattedData = {
                    "tweet_id": stat[e].id,
                    "username": stat[e].user.name,
                    "screen_name": stat[e].user.screen_name,
                    "text": stat[e].text,
                    "created_at": stat[e].created_at,
                    "total_likes_user_has": stat[e].user.favourites_count,
                    "followers": stat[e].user.followers_count,
                    "followings": stat[e].user.friends_count,
                    "profile_img": stat[e].user.profile_image_url
                  };
                  newObject.tweets.push(formattedData);
                  
                }//end of for loop
                newObject.completed_times.push(data.search_metadata.completed_in);

                max_id = data.search_metadata.max_id;
                twitter.get('search/tweets', { q: term, since_id: maxId, count: 100 }, function(err, data, response){
                  var stat = data.statuses;
                  for(var e = 1; e < stat.length;e++){
                    var formattedData = {
                      "tweet_id": stat[e].id,
                      "username": stat[e].user.name,
                      "screen_name": stat[e].user.screen_name,
                      "text": stat[e].text,
                      "created_at": stat[e].created_at,
                      "total_likes_user_has": stat[e].user.favourites_count,
                      "followers": stat[e].user.followers_count,
                      "followings": stat[e].user.friends_count,
                      "profile_img": stat[e].user.profile_image_url
                    };
                    newObject.tweets.push(formattedData);
                    
                  }//end of for loop
                  newObject.completed_times.push(data.search_metadata.completed_in);
                  
                  max_id = data.search_metadata.max_id;
                  twitter.get('search/tweets', { q: term, since_id: maxId, count: 100 }, function(err, data, response){
                    var stat = data.statuses;
                    for(var e = 1; e < stat.length;e++){
                      var formattedData = {
                        "tweet_id": stat[e].id,
                        "username": stat[e].user.name,
                        "screen_name": stat[e].user.screen_name,
                        "text": stat[e].text,
                        "created_at": stat[e].created_at,
                        "total_likes_user_has": stat[e].user.favourites_count,
                        "followers": stat[e].user.followers_count,
                        "followings": stat[e].user.friends_count,
                        "profile_img": stat[e].user.profile_image_url
                      };
                      newObject.tweets.push(formattedData);
                      
                    }//end of for loop
                    newObject.completed_times.push(data.search_metadata.completed_in);
                    newObject.tweetCount = newObject.tweets.length;

                    var sumTime = newObject.completed_times.reduce(function(num1, num2){ return num1 + num2; },0);
                    console.log(sumTime);
                    var tweetsPerSecCalc = (100/(Math.round(sumTime * 100))* newObject.tweetCount);

                    newObject.tweetsPerSec = tweetsPerSecCalc;
                    callback.send(newObject);
                  });// sixth twitter grab
                  
                });// fifth twitter grab

              });// fourth twitter grab

            });// third twitter grab

          });// second twitter grab

        }// end of the if else conditional for error check / nothing found check
    });// end of the initial twitter data grab
  }// end of the searchbyterm function
};