(function($, Electus){
    var socket = io.connect('http://techopinion.jit.su');
    var sentences = new Electus.Sentences({});
    sentences.on("send", function(sentence){
	socket.emit("sentence", sentence.toJSON());
    });
    $(function(){
	new Electus.SentencesView({ model : sentences, el : $("#viewport") });
    });
})(jQuery, Electus);
