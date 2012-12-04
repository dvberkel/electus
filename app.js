var io = require("socket.io").listen(3435);

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
	console.log(data);
    });
    socket.on("agreement", function(data){
	console.log(data);
    })
});
