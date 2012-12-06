(function($, Electus){
    var socket = io.connect('http://techopinion.jit.su');
    var sentences = new Electus.Sentences({
        "after-send": [function(){
            socket.emit("sentence", this.toJSON());
        }]
    });
    $(function(){
	new Electus.SentencesView({ model : sentences, el : $("#viewport") });
    });
})(jQuery, Electus);
