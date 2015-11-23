var User = require('../helper_functions/user_account.js');

module.exports.controller = function(app) {
	//use either post man or advanced rest client

	app.get('/users/all',function(req,res){
		//shows all users
		User.showAllUsers(res);
	});

	//create new user
	app.post('/users',function(req,res){
		var body = req.body;
		req.session.name = body.username;
		req.session.password = body.password;
		req.session.email = body.email
		User.createUser(body.username, body.password, body.email,res);
	});	

	//grab user based on user session
	app.get('/users',function(req,res){
		User.findUser(req.session.name,res);
	});

	//delete user based on user session
	app.delete('/users',function(req,res){
		User.deleteUser(req.session.name, req.session.name, res);
		req.session.name = null;
		req.session.password = null;
		req.session.email = null;
	});

	//update current user's account info based on user session
	app.put('/user',function(){
		User.updateUser(res, req.session.name, body.username, body.password, body.email);
	});

};