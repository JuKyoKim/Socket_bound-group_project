var session = require('express-session'),
	User    = require('../models/player.js');

module.exports = {
	findUser:function(name, pass, callback){
		User.find({username: name, password: pass}).exec(function (err, user) {
    		callback.send(user);
  		});;
	},
	createUser:function(name, pass, callbackk){
		var newUser = new User({
			username: name,
			password: pass
		});

		newUser.save(function(err){
			err ? console.log(err) : console.log("new user: "+ newUser.username + " has been saved to the database");
		});

		callback.send(newUser);
	},
	deleteUser:function(){
		console.log("function kicking");		
	},
	updateUser:function(){
		console.log("function kicking");		
	}
};