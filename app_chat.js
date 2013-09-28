var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

server.listen(8080);
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function(request, response){
  response.render('index');
});

io.sockets.on('connection', function(client){
  console.log('Connecting client...');

  client.on('join', function(name){
    client.set('nickname', name);
  });

  client.on('messages', function(data){
    client.get('nickname', function(err, name) {
      io.sockets.emit("messages", name + ": " + data);
    });
  });

});
