(function($, _, Backbone, Electus){
    var Sentence = Backbone.Model.extend({
	defaults: {
          text : "Empty sentence"
        }
    });
	
    var Sentences = Backbone.Collection.extend({
	model: Sentence,
        initialize: function (models, options) {
        },
	addAll: function(sentences) {
          this.reset();
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

    var SentencesView = Backbone.View.extend({

        initialize : function() {
          this.model.on("add", this.render, this);
          this.render();
        },
 
        render : function(){
          this.$el.empty();
          var table = $('<table class="sentences table table-striped table-bordered table-condensed"></table>');
          this.model.each(function(sentence) {
            new SentenceWithButtonView({model: sentence, el: table});
          });
          table.appendTo(this.$el);
          new UploadSentencesView({model: this.model, el: this.$el});
        }
    });

    var SentenceWithButtonView = Backbone.View.extend({
        template : _.template("<td><%= text %></td>"),

        initialize : function(){
            this.render();
        },

        render : function(){
            var row = $("<tr></tr>");
            $(this.template(this.model.toJSON())).appendTo(row);
            new SendButton({model: this.model, el: row});
            row.appendTo(this.$el);
        }
    });

    var SendButton = Backbone.View.extend({
        initialize : function() {
            this.render();
        },

        render : function() {
            var self = this;
            var button = this.button();
            button.click(function(){
                console.log("implement send over here!" + self.model.get("text"));
                button.hide();
            });
            var td = $('<td></td>');
            button.appendTo(td);
            td.appendTo(this.$el);
        },

        button : function() {
            if (this._button === undefined) {
                this._button = $("<button class='send btn btn-success'>send</button>");
            }
           return this._button;
        }
    });

    var UploadSentencesView = Backbone.View.extend({

        initialize : function(){
            this.render();
        },

        render : function(){
            var self = this;
            var textarea = $("<textarea></textarea>");
            textarea.appendTo(this.$el);
            var button = $("<button class='upload btn btn-success'>upload</button>");
            button.click(function() {
             self.model.addAll(textarea.val());
            });
            button.appendTo(this.$el);
        }
    });




    Electus.Sentence = Sentence;
    Electus.Sentences = Sentences;
    Electus.SentenceView = SentenceView;
    Electus.SentencesView = SentencesView;
})(jQuery, _, Backbone, Electus);
