(function($, Electus){
    var socket = io.connect('http://localhost:3435');
    socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', { my: 'data' });
    });

    var statement = new Electus.Statement({
	"after-agreement": [function(){
	    socket.emit("agreement", statement.toJSON());
	}]
    });

    $(function(){
	new Electus.StatementView({ model : statement, el : $("#viewport") });
    });
})(jQuery, Electus);

