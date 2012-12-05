(function($, Electus){
    var sentences = new Electus.Sentences();
    sentences.addAll("Sentence One; Sentence Two");

    $(function(){
	new Electus.SentencesView({ model : sentences, el : $("#viewport") });
    });
})(jQuery, Electus);
