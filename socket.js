module.exports = function(app, io) {

var usernames = [];
var inGame = false;

io.on('connection', function(socket) {
	var addedUser = false;
	console.log(usernames);

	// when the socket emits 'new message', this listens and executes
	//allows the messages for both people to come up on chat
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
		usernames.push({id: socket.id, username: socket.username, inGame: false});
    // usernames[username] = username;
    addedUser = true;
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username
    });
  });

socket.on('get users', function(data) {
		socket.broadcast.emit('get users', usernames);
	});

socket.on('send invite', function(data){
	console.log('send invite on socket.js file');
});

	// when the user disconnects.. perform this
  socket.on('disconnect', function (data) {
		console.log(data + " disconnect");
    // remove the username from global usernames list
    if (addedUser) {
      usernames.forEach(function(user, index){
				if (user.username === "zoe") {
					var i = usernames.indexOf(index);
					usernames.splice(i, 1);
				}
				console.log(usernames);
				  socket.emit('get users', "getting users");
			});
}
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
      });

  });


}); //end io.on
}; //end module
