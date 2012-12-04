(function($, Electus){
    var sentences = new Electus.Sentences();

    $(function(){
	new Electus.SentencesView({ model : sentences, el : $("#viewport") });
    });
})(jQuery, Electus);
