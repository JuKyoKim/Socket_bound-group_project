module.exports = function(app, io) {


var usernames = {};
var inGame = false;

io.on('connection', function(socket) {
	var addedUser = false;

	// when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

socket.on('add user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    addedUser = true;
    // socket.emit('login', {
    //   numUsers: numUsers
    // });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username
    });
  });

// 	socket.on('get users', function(data) {
// 		socket.emit('get users', usernames);
// 	});
//
// var addedUser = false;
// 	socket.on('add user', function(username){
// 		var userObj = {};
// 		userObj.name = username;
// 		userObj.id = socket.id;
// 		userObj.ingame = false;
// 		usernames.push(userObj);
// 		addedUser = true;
// 		socket.broadcast.emit('user joined', usernames);
// 		socket.emit('user joined', usernames);
// 	});


}); //end io.on
}; //end module
