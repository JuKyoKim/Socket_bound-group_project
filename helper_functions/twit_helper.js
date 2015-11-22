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
		twitter.get('search/tweets', { q: term + ' since:' + todaysDate, count: 49 }, function(err, data, response) {
  			if(err){
  				callback.send(err);// error handling
  			}else if(data.statuses.length === 0){
  				callback.sendstatus(404);//check to see if anyone used this work ever
  			}else{
  				var maxId = data.statuses[data.statuses.length-1].id; // sets the lowest id
  				twitter.get('search/tweets', { q: term + ' since:' + todaysDate+'&max_id=' + maxId, count: 100 }, function(err, data, response) {
  					err ? callback.send(err) : callback.send(data); //response is called back and sends data back or sends error
				});// end of the secondary twitter data grab
  			}// end of the if else conditional for error check / nothing found check
		});// end of the initial twitter data grab
	}// end of the searchbyterm function
};
