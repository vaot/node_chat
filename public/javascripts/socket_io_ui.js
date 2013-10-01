$(function() {
  var socket = io.connect(),
      num = 1;
  socket.on('connect', function(data) {
    nickname = prompt('Whats your nickname ?') || 'Annonyous';
    socket.emit('join', nickname);
  });
  socket.on('messages', function(data){
    var $messageBox = $('.messages-box');
        height = $messageBox[0].scrollHeight;
    $messageBox.append('<blocknote><p>' + data + '</p></blocknote>');
    $messageBox.scrollTop(height);
  });
  $('#chat_input').on('keypress', function(e){
    if (e.which == 13) {
      $('#submit').click();
      $(this).val('');
    }
  });
  $('#submit').on('click', function(e) {
    e.preventDefault();
    var message = $('#chat_input').val();
    if (message.length > 0) socket.emit('messages', message);
  });
});
