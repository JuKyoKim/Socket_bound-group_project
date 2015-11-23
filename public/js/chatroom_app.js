console.log('chatroom_app is loaded');

$(function() {
  $('#invite').on('click', sendInvite);
  $('.accept').on('click', renderGameBoard);
});

var socket = io();
console.log(socket);
  //sends a message in the chat room
    $('.msg').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });

//button to send invite
var sendInvite = function() {
  var inviteButton = $('#inviteButton');
  socket.emit('invite', inviteButton);
};

//sends an invite to another user to ask them to play a game AKA makes an accept button show up on other user's page
socket.on('invite', function(newButton){
  $('body').append($('<button class="accept">').text('accept game'));
});

var renderGameBoard = function() {
  var accept = $('.accept');
  socket.emit('game', accept);
};

socket.on('game', function(gameboard){
  var game = $('<p>').text('here is the game board');
  $('body').append(game);
});
