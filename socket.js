module.exports = function(app, io) {

	var usernames = [];
	var inGame = false;
	var opponentid;
	var playerid;

	io.on('connection', function(socket) {
		var addedUser = false;

		socket.on('add user', function(username) {
			// we store the username in the socket session for this client
			socket.username = username;
			// add the client's username to the global list
			usernames.push({
				id: socket.id,
				username: socket.username,
				inGame: false
			});
			// usernames[username] = username;
			addedUser = true;
			// echo globally (all clients) that a person has connected
			socket.broadcast.emit('user joined', {
				username: socket.username
			});
		});

		//gets users intially and continually when someone logs in.
		socket.on('get users', function(data) {
			socket.broadcast.emit('get users', usernames);
		});

		//allows the messages for both people to come up on chat
		socket.on('new message', function(data) {
			socket.broadcast.emit('new message', {
				username: socket.username,
				message: data
			});
		});

		socket.on('send invite', function(data) {
			// console.log(data + "send invite from socket.js file");
			opponentid = data.opponent;
			playerid = data.player;
			//sends the invite only to the opponent you select
			socket.broadcast.to(opponentid).emit('send invite', data);
			//sends "waiting for user to accept" to the person who sent the invite
			socket.emit('invitation sent', data);
		});


		socket.on('start game', function(data) {
			opponentid = data.opponent;
			playerid = data.player;
			inGame = true;
			socket.broadcast.to(opponentid).emit('start game', data);
			socket.emit('start game', data);
		});

		// when the user disconnects.. perform this
		  socket.on('disconnect', function (data) {
		    // remove the username from global usernames list
		    if (addedUser) {
		      usernames.forEach(function(user, index){
						if (user.username === data.username) {
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
