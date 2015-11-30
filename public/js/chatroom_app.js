console.log('chatroom_app is loaded');

$(function() {

	$('body').on('click', '#play-button', showLogin);
	$('body').on('click', '#submit-username', setUsername);
	$('body').on('click', '#send-message', sendMessage);
  $('body').on('click', '#send-private-message', privateMessage);
	$('body').on('click', '.invite-button', sendInvite);
	$('body').on('click', '.accept-button', startGame);
}); //end onload

//global variables
var socket = io();
var username;
var opponentid;


var showLogin = function() {
	$('#instruction-window').hide();
	$('#login').show();
	// socket.emit('get users', "getting users");
};

//get users that are already there
socket.on('get users', getUsers);

function getUsers(users) {
	$('.users-online').empty();
	if(users.length > 0) {
		users.forEach(function(user) {
			if(user.username !== username && !user.inGame) {
				var newLi = $('<li class="user-text">');
				newLi.attr('socketid', user.id);
				$('.users-online').append(newLi);
				var userText = $('<p class="usernametext">').text(user.username);
				$(newLi).append(userText);
				var inviteButton = $('<button class="invite-button">').text("Invite to Play");
				$(newLi).append(inviteButton);
			}
		});
	}
}

function setUsername() {
	//sets username equal to what the person inputted in text box
	username = $('#login-input').val().trim();
	if(username) {
		$('#global-chat').show();
		$('#login').hide();

		//welcome message displayed on main page
		var welcomeMsg = $('<h4 id="welcome">').text('Welcome, ' + username + ".");
		$('#global-chat').prepend(welcomeMsg);

		//tell server your username
		socket.emit('add user', username);
	}
	//gets user list of people already logged in
	socket.emit('get users', getUsers);
}

function sendMessage() {
	var message = $('#message-content').val();
	//sends a message object with the author and content
	addChatMessage({
		username: username,
		message: message
	});
	// this allows you to send message to other people in global chat
	socket.emit('new message', message);
	$('#message-content').val('');
}

// Whenever the server emits 'new message', update the chat body
socket.on('new message', function(data) {
	addChatMessage(data);
});


function addChatMessage(data) {
	//renders message to the chat window as user: message content
	var newLi = $('<li id="chatmessage">');
	$("#messages").append(newLi);
	var $usernameDiv = $('<span class="username"/>').text(data.username + ": ").css('color', 'red');
	var $messageBodyDiv = $('<span class="messageBody">').text(data.message + " ");
	var $messageDiv = $('#messages');
	$messageDiv.append($usernameDiv, $messageBodyDiv);
}

//shows the invite from html document
socket.on('send invite', function(data) {
	$('.invite').show();
	$('.accept-button').attr('socketid', data.player);
	var inviteStatus = $('<h3 class="invite-arrived">').text('invitation to play from ' + data.name + ".");
	$('.invite').prepend(inviteStatus);
});

socket.on('invitation sent', function(data) {
	$('.sent-invite').show();
	var waiting = $('<h3 class="waiting-msg">').text("Waiting for " + data.oppName + " to respond...");
	$('.sent-invite').append(waiting);
});

function sendInvite(e) {
	var opponent = $(this).parent().closest('p').text();
	var opponentName = $(this).parent().find('p').text();
	//sets global variable of opponent id
	opponentid = $(this).parent().attr('socketid');
	$(this).remove();

	socket.emit('send invite', {
		opponent: opponentid,
		oppName: opponentName,
		player: socket.id,
		name: username
	});
}

//when a user presses accept it will start a game
function startGame(e) {
	opponentid = $(this).attr('socketid');
	socket.emit('start game', {
		opponent: opponentid,
		player: socket.id
	});
}

socket.on('start game', function(players) {
	$('#game_container').show();
	//set up opponent and player identification ids to emit events to later
	$("#game_container").attr('opponentid', opponentid);
	$("#game_container").attr('playerid', socket.id);

  // $('#users-header').hide();
  $('#global-chat').hide();
  $('#send-message').attr('id','send-private-message');
	$('#messages').empty();
	$('#invite-section').hide();
	// $('#game-div').text('Game goes here.');
});



function privateMessage(e) {
	opponentid = $(this).parent().parent().parent().parent().find('#game_container').attr('opponentid');

	var message = $('#message-content').val();

	addChatMessage({
		username: username,
		message: message,
		opponent: opponentid
	});

	socket.emit('private message', {
		username: username,
		message: message,
		opponent: opponentid
	});
	$('#message-content').val('');

}

// Whenever the server emits 'new message', update the chat body
socket.on('private message', function(data) {
	addChatMessage(data);
});





//user leaves
socket.on('user left', function(data) {
	socket.emit('user left', {
		name: data.username
	});
});
