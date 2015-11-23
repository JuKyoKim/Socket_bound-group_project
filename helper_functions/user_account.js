var User = require('../models/player.js');

module.exports = {
	createUser:function(name, pass, email, callback){
		var newUser = new User({
			username: name,
			password: pass,
			email: email
		});

		newUser.save(function(err){
			err ? console.log(err) : callback.send(newUser);
		});
	},
	findUser:function(name, password, callback){
		User.find({username: name, password: password}).exec(function (err, user) {
			err ? console.log(err) : callback(user);
  		});
	},
	showAllUsers:function(callback){
		User.find().exec(function(err,allUsers){
			err ? console.log(err) : callback.send(allUsers);
		});
	},
	deleteUser:function(name, pass, callback){
		User.remove({username: name, password: pass}).exec(function(err){
			err ? console.log(err) : callback.send( name + " has been removed" );
		});		
	},
	updateUser:function(callback, session_name, updated_name, updated_password, updated_email){
		var update_array = {
			username: "place",
			password: "place",
			email: "place"
		};
		
		User.find({username: session_name}).exec(function(err, user){
			if(err){
				console.log(err);
			}else{

				updated_email === undefined ? update_array.email = user[0].email : update_array.email = updated_email;
				updated_name === undefined ? update_array.username = user[0].username : update_array.username = updated_name;
				updated_password === undefined ? update_array.password = user[0].password : update_array.password = updated_password;

				User.update({username: session_name}, {$set: update_array}, function(err, user){
					err ? console.log(err) : callback.send("user information has been updated");
				});

			}
		});
	}
};