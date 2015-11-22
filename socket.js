module.exports = function(app, io) {

//on connection to the socket
  io.on('connection', function(socket) {

  //tests to see if it's working with the background color
  	socket.on('color', function() {
  		socket.broadcast.emit('color', 'orange');
  	});

//invites another user on the socket to a game - an accept button will pop up that is rendered on public/js/app.js
  	socket.on('invite', function(newButton) {
  		socket.broadcast.emit('invite', newButton);
  	});


//chat features - sends a message that is rendered in public/js/chatroom_app.js
  	socket.on('chat message', function(msg) {
  		io.emit('chat message', msg);
  	});

  //logs that a user has left hte chat room
  	socket.on('disconnect', function() {
  		console.log('user disconnected');
  	});

  }); //end io.on
}; //end module
