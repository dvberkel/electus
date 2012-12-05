var io = require("socket.io").listen(process.env.PORT || 3435);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
    socket.on('sentence', function(data){
	console.log(data);
	socket.broadcast.emit("sentence", data);
    });
    socket.on("agreement", function(data){
	console.log(data);
	socket.broadcast.emit("agreement", data);
    })
});
