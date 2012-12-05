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
        initialize : function(){
            this.model.on("change:text", this.render, this);
            this.render();
        },

        render : function(){
            var span = this.span();
            span.text(this.model.get("text"));
        },

        span : function(){
            if (! this._span) {
                this._span = $("<h1 class='sentence'>?</h1>");
                this._span.appendTo(this.$el);
            }
            return this._span;
        }
    });

    Electus.Sentence = Sentence;
    Electus.Sentences = Sentences;
    Electus.SentenceView = SentenceView;
})(jQuery, _, Backbone, Electus);
