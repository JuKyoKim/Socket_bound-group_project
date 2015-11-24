console.log('chatroom_app is loaded');

$(function() {

$('body').on('click', '#play-button', showLogin);
$('body').on('click', '#submit-username', setUsername);
$('body').on('click', '#send-message', sendMessage);
socket.emit('get users', "getting users");
});//end onload

//global variables
var socket = io();
var username;

var showLogin = function(){
  $('#play-button').hide();
  $('#login').show();
};

// // Gets users that are connected when you first join
// socket.on('get users', addUser);
// // Updates users when a user joins
// socket.on('user joined', addUser);

//get users that are already there

socket.on('get users', getUsers);

function getUsers(users) {
  $('.users-online').empty();
  console.log(users);
  if (users.length > 0) {
    users.forEach(function(user){
      if (user.username !== username) {
      var userText = $('<p class="user-text">').text(user.username);
      $('.users-online').append(userText);}
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
    socket.emit('get users', "getting users");
  }
}

socket.on('user joined', function (data) {
    console.log(data.username + ' joined');
  });




function sendMessage () {
  console.log('send message');

  var message = $('#message-content').val();

  addChatMessage({
    username: username,
    message: message
  });
  socket.emit('new message', message);
}

function addChatMessage (data) {
  console.log(data);
  console.log('add chat message');
  var $usernameDiv = $('<span class="username"/>')
      .text(data.username + ": ").css('color', 'red');
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message + " ");
    var $messageDiv = $('#messages');
    $messageDiv.append($usernameDiv, $messageBodyDiv);
}

socket.on('user joined', function (data) {
  console.log(data.username + ' joined');
});

// Whenever the server emits 'new message', update the chat body
socket.on('new message', function (data) {
  console.log(data);
  addChatMessage(data);
});

//user leaves
socket.on('user left', function (data) {
    console.log(data.username + ' left');
  });
