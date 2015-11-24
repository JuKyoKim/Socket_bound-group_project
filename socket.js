module.exports = function(app, io) {


var usernames = [];
var inGame = false;

io.on('connection', function(socket) {
	var addedUser = false;
	console.log(usernames);

	// when the socket emits 'new message', this listens and executes
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
		usernames.push({username});
    // usernames[username] = username;
    addedUser = true;
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username
    });
  });

socket.on('get users', function(data) {
		socket.emit('get users', usernames);
	});

	// when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      usernames.forEach(function(user, index){
				if (user.username === "zoe") {
					var i = usernames.indexOf(index);
					usernames.splice(i, 1);
				}
				console.log(usernames);
			});

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
      });
    }
  });

}); //end io.on
}; //end module
