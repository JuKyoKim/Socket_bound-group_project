var User = require('../helper_functions/user_session.js');

module.exports.controller = function(app) {

	app.get('/user/new', function(req, res){
		User.createUser("tom", "tom1234");
	});

	app.get('/user/:name', function(req, res){
		User.findUser(req.params.name,"tom12",res);
		//look to see if session has a name
		//if not then make the user not exist
	});


}