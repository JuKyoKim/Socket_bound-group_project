var User = require('../helper_functions/user_account.js');

module.exports.controller = function(app) {
	//use either post man or advanced rest client

	app.get('/users/all',function(req,res){
		//shows all users
		User.showAllUsers(function(user){
			res.send(user);
		});
	});

	app.post('/users/login',function(req,res){
		var body = req.body;
		User.findUser(body.username, function(user){
			if(user.length === 0){
				res.send({
					logged_in: false,
					username: "null",
					reason: "user does not exist in our database!"
				});
			}else{
				console.log(user[0].username);
				if(user[0].username === body.username && user[0].password === body.password){
					req.session.name = user[0].username;
					req.session.password = user[0].password;
					req.session.email = user[0].email;
					res.send({
						logged_in: true,
						username: req.session.name,
						reason: "null"

					});
				}else{
					res.send({
						logged_in: false,
						username: "null",
						reason: "login info is incorrect!"

					});
				}
			}
		});
	});

	app.delete('/users/logout', function(req,res){
		req.session.name = null;
		req.session.password = null;
		req.session.email = null;
		res.send({
			response: "logged out"
		});
	});

	//create new user
	app.post('/users',function(req,res){
		var body = req.body;
		req.session.name = body.username;
		req.session.password = body.password;
		req.session.email = body.email;
		User.createUser(body.username, body.password, body.email, function(user){
			res.send(user);
		});
	});	

	//grab user based on user session
	app.get('/users',function(req,res){
		User.findUser(req.session.name, function(user){
			if(user.length === 0){
				res.send({
					logged_in: false,
					username: req.session.name,
					reason: "you are not logged in"
				});
			}else{
				User.findUser(req.session.name, function(user){
					res.send(user);// pulls the user from userfind and sends it out
				});
			}
		});
			
	});

	//delete user based on user session
	app.delete('/users',function(req,res){
		var body = req.body;
		req.session.name = null;
		req.session.password = null;
		req.session.email = null;
		User.deleteUser(body.username, body.password, function(name){
			res.send({
				response: "user has been deleted"
			});
		});
	});

	//update current user's account info based on user session
	app.patch('/user',function(req,res){
		User.updateUser(function(user){
			res.send(user);
		}, req.session.name, body.username, body.password, body.email);
	});

};