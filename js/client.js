(function($, Electus){
    var socket = io.connect('http://localhost:3435');
    socket.on('sentence', function (data) {
	statement.setSentence(data.text);
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

