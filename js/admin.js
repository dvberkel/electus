(function($, Electus){
    var socket = io.connect('http://localhost:3435');
    var sentences = new Electus.Sentences({
        "after-send": [function(){
            socket.emit("sentence", this.toJSON());
        }]
    });
    $(function(){
	new Electus.SentencesView({ model : sentences, el : $("#viewport") });
    });
})(jQuery, Electus);
