var isInitiator = false;

var configuration = null;

var Peer = require('simple-peer')
var p;

var fs = require('fs');

var _static = require('node-static');
var file = new _static.Server('./static', {
    cache: false
});

var options = {
    key: fs.readFileSync('fake-keys/privatekey.pem'),
    cert: fs.readFileSync('fake-keys/certificate.pem')
};

//var app = require('http').createServer(serverCallback);
var app = require('https').createServer(options, serverCallback);

function serverCallback(request, response) {
    request.addListener('end', function () {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        file.serve(request, response);
    }).resume();
}

var io = require('socket.io').listen(app, {
    log: true,
    origins: '*:*'
});

/*io.set('transports', [
    // 'websocket',
    //'xhr-polling',
    //'jsonp-polling'
    'websocket',
    'polling'
]);*/

// io.sockets.on('connection', function (socket) {
//     var initiatorChannel = '';
//     if (!io.isConnected) {
//         io.isConnected = true;
//     }

//     console.log('Client said: ', 'test');

//     socket.emit('create or join', "temproom");

// socket.on('message-peer', function(message) {
//   //console.log('Client received message ', message);
//   console.log('Client-peer received message ', message);
// });
// });

var socket = require('socket.io-client')('https://localhost:8080',{secure: true, port:6060});
  socket.on('connect', function(){});
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
  socket.emit('create or join', "temproom");
  socket.on('message-peer', function(message) {
  //console.log('Client received message ', message);
  console.log('Client-peer received message ', message);
});

app.listen(8081);
