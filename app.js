var io = require("socket.io").listen(80);

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
