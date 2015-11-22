console.log('chatroom_app is loaded');
$(document).ready(function(){

  //sends a message in the chat room
 var socket = io();
    $('.msg').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });



});
