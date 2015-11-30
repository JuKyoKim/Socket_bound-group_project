console.log('socket_game.js is loaded');

$(function() {
  sendHp(playerhp);
  console.log(playerhp);

});

var sendHp = function(playerhp) {
  console.log(playerhp);
  socket.emit('send HP', playerhp);
};

socket.on('send HP', function(hp){
  var hpText = $("<p class='hp'>").text(hp);
  $('.header').append(hpText);
});
