console.log('chatroom_app is loaded');

$(function() {

$('body').on('click', '#play-button', showLogin);
$('body').on('click', '#submit-username', setUsername);
$('body').on('click', '#send-message', sendMessage);
$('body').on('click', '.invite-button', sendInvite);


// socket.emit('get users', "getting users");
});//end onload

//global variables
var socket = io();
var username;
var opponentid;

var showLogin = function(){
  $('#play-button').hide();
  $('#login').show();
};

//get users that are already there
socket.on('get users', getUsers);

function getUsers(users) {
  $('.users-online').empty();
  console.log(users);
  if (users.length > 0) {
    users.forEach(function(user){
      if (user.username !== username && !user.inGame) {
        var newLi = $('<li class="user-text">');
        newLi.attr('socketId', user.id);
        $('.users-online').append(newLi);
      var userText = $('<p class="usernametext">').text(user.username);
      $(newLi).append(userText);
      var inviteButton = $('<button class="invite-button">').text("Invite to Play Game");
      $(newLi).append(inviteButton);
    }
    });
  }
  console.log('users gotten');
}

function setUsername () {
  console.log('set username');
    console.log(socket);
  username = $('#login-input').val().trim();
  if(username) {
    $('#global-chat').show();
    $('#login').hide();
    //tell server your username
    socket.emit('add user', username);
  }
    socket.emit('get users', "getting users");
}

// socket.on('user joined', function (data) {
//   console.log(data.username + ' joined');
//   socket.emit('get users', "getting users");
// });


function sendMessage () {
  console.log('send message');

  var message = $('#message-content').val();

  addChatMessage({
    username: username,
    message: message
  });
  //this allows you to send message to other people in global chat
  socket.emit('new message', message);
}

// Whenever the server emits 'new message', update the chat body
socket.on('new message', function (data) {
  console.log(data);
  addChatMessage(data);
});

function addChatMessage (data) {
  console.log(data);
  var $usernameDiv = $('<span class="username"/>')
      .text(data.username + ": ").css('color', 'red');
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message + " ");
    var $messageDiv = $('#messages');
    $messageDiv.append($usernameDiv, $messageBodyDiv);
}



socket.on('send invite', function(data) {
  $('.invite').show();
});

function sendInvite(e) {
var opponent = e.target.parentElement.firstChild.innerHTML;
opponentid = e.target.parentElement.getAttribute('socketid');
socket.emit('send invite', {opponent: opponentid, player: socket.io.engine.id, name: username});
}




// //user leaves
// socket.on('user left', function (data) {
//     console.log(data.username + ' left');
//   });
