var io = require("socket.io").listen(3435);

io.sockets.on('connection', function (socket) {
    socket.emit('sentence', { text: 'It is better to ask forgiveness then permission' });
    socket.on("agreement", function(data){
	console.log(data);
    })
});
