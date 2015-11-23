var User = require('../helper_functions/user_account.js');

module.exports.controller = function(app) {
	//use either post man or advanced rest client

	app.get('/users/all',function(req,res){
		//shows all users
		User.showAllUsers(res);
	});

	app.post('/users/login',function(req,res){
		var body = req.body;
		console.log(body);
		User.findUser(body.username, body.password, function(user){
			if(user === undefined){
				res.send({
					logged_in: false,
					username: "null",
					reason: "user does not exist in our database!"
				});
			}else{
				if(user.username === body.username && user.password === body.password){
					req.session.name;
					req.session.password;
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

	//create new user
	app.post('/users',function(req,res){
		var body = req.body;
		req.session.name = body.username;
		req.session.password = body.password;
		req.session.email = body.email;
		User.createUser(body.username, body.password, body.email,res);
	});	

	//grab user based on user session
	app.get('/users',function(req,res){
		if(req.session.name === undefined){
			res.send({
				logged_in: false,
				username: req.session.name,
				reason: "you are not logged in!"
			});
		}else{
			User.findUser(req.session.name, req.session.password,function(user){
				res.send(user);// pulls the user from userfind and sends it out
			});
		}
	});

	//delete user based on user session
	app.delete('/users',function(req,res){
		User.deleteUser(req.session.name, req.session.name, res);
		req.session.name = null;
		req.session.password = null;
		req.session.email = null;
	});

	//update current user's account info based on user session
	app.patch('/user',function(req,res){
		User.updateUser(res, req.session.name, body.username, body.password, body.email);
	});

};