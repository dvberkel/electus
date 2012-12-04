(function($, _, Backbone, Electus){
    var Sentence = Backbone.Model.extend({
	defaults: {
          text : "Empty sentence"
        }
    });
	
    var Sentences = Backbone.Collection.extend({
	model: Sentence,
        initialize: function (models, options) {
          // todo
        },
	addAll: function(sentences) {
          var splitSentences = sentences.split(";");
          for (var i=0; i < splitSentences.length; i++) {
            this.add(new Sentence({text: splitSentences[i]}));
          }
        }
    });

    var SentenceView = Backbone.View.extend({
        template : _.template("<h1 class='sentence'><%= text %></h1>"),

        initialize : function(){
            this.render();
        },

        render : function(){
            var span = $(this.template(this.model.toJSON()));
            span.appendTo(this.$el);
        }
    });

    Electus.Sentence = Sentence;
    Electus.Sentences = Sentences;
    Electus.SentenceView = SentenceView;
})(jQuery, _, Backbone, Electus);
