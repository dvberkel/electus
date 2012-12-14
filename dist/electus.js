/*! electus - v0.0.0-2 - 2012-12-14
* https://github.com/dvberkel/electus
* Copyright (c) 2012 Daan van Berkel; Licensed MIT */

(function(env){
    "use strict";
    env.Electus = { "version" : "0.0.0" };
})(window ? window : module.exports);

(function($, _, Backbone, Electus){
    var Sentence = Backbone.Model.extend({
        defaults: {
          text : "Empty sentence"
        },

        send: function() {
          this.trigger("send", this);
        }
    });
        
    var Sentences = Backbone.Collection.extend({
        model: Sentence,

        addAll: function(sentences) {
          this.reset();
          var splitSentences = sentences.split(";");
          var self = this;
          _.each(splitSentences, function(text) {
            var sentence = new Sentence({text: text});
            this.add(sentence);
          }, this);
        },

       send: function(sentence) {
          sentence.send();
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
                self.model.send();
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

(function($, _, Backbone, Electus, undefined){
    var Statement = Backbone.Model.extend({
        initialize : function(){
            if (! this.has("sentence")) {
                this.set("sentence", new Electus.Sentence({ text : "You should come prepared" }));
            }
            this.get("sentence").on("change:text", function(){
                this.trigger("change:sentence");
            }, this);
        },

        agree : function(){
            this.set("agreement", true);
        },

        disagree : function(){
            this.set("agreement", false);
        },

        setSentence : function(text){
            this.get("sentence").set("text", text);
            this.set("agreement", undefined, {silent:true});
        }
    });

    var StatementView = Backbone.View.extend({
        initialize : function(){
            this.render();
        },

        render : function(){
            var container = $("<div class='statement'></div>");
            new Electus.SentenceView({model : this.model.get("sentence"), el : container });
            new AgreeButton({model : this.model, el : container });
            new DisagreeButton({model : this.model, el : container });
            container.appendTo(this.$el);
        }
    });

    var Button = Backbone.View.extend({
        _template : _.template("<button class='<%= name %> btn btn-large <%= css_class %>'><%= name %></button>"),

        initialize : function(){
            if (! this.options.onClick) {
                this.options.onClick = function(){ return function(){}; };
            }
            this.model.on("change:sentence", function(){
                this.button().show();
            }, this);
            this.model.on("change:agreement", function(){
                this.button().hide();
            }, this);
            this.render();
        },

        render : function(){
            var button = this.button();
            button.click(this.options.onClick(this.model));
        },

        button : function(){
            if (this._button === undefined) {
                this._button = $(this._template(this.options));
                this._button.appendTo(this.$el);

                if (this.model.get("agreement") !== undefined) {
                    this._button.hide();
                }
            }
            return this._button;
        }
    });

    var AgreeButton = Button.extend({
        initialize : function(){
            this.options.name = "agree";
            this.options.css_class = "btn-success";
            this.options.onClick = function(statement){
                return function(){ statement.agree(); };
            };
            
            Button.prototype.initialize.call(this);
        }
    });

    var DisagreeButton = Button.extend({
        initialize : function(){
            this.options.name = "disagree";
            this.options.css_class = "btn-danger";
            this.options.onClick = function(statement){
                return function(){ statement.disagree(); };
            };
            
            Button.prototype.initialize.call(this);
        }
    });

    Electus.Statement = Statement;
    Electus.StatementView = StatementView;
})(jQuery, _, Backbone, Electus);

(function($, _, Backbone, Electus, undefined){
    var Agreement = Backbone.Model.extend({
        defaults: { _agreements : 0, _disagreements : 0 },

        agreements : function(){
            return this.get("_agreements");
        },

        disagreements : function(){
            return this.get("_disagreements");
        },

        agreement : function(agreement){
            if (agreement === true) {
                this.set("_agreements", this.get("_agreements") + 1);
            }
            if (agreement === false) {
                this.set("_disagreements", this.get("_disagreements") + 1);
            }
        },

        votes : function(){
            return this.agreements() + this.disagreements();
        }
    });
    
    var Agreements = Backbone.Collection.extend({
        model : Agreement,
  
        addAgreements : function(text, agreement){
            var target = this.agreementWithText(text);
            if (target === undefined) {
                target = new Agreement({ "sentence" : new Electus.Sentence({ text : text })});
                this.add(target);
            }
            target.agreement(agreement);
        },

        agreementWithText : function(text){
            var target;
            this.each(function(candidate){
                if (candidate.get("sentence").get("text") === text) {
                    target = candidate;
                }
            });
            return target;
        }
    });

    var AgreementsView = Backbone.View.extend({
        initialize : function(){
            this.render();
            this.model.on("add", this.render, this);
        },

        render : function(){
            this.$el.empty();
            var table = $("<table class='agreements table table-striped table-bordered table-condensed'></table>");
            table.append($("<tr></tr>").append($("<td><i class='icon-thumbs-up'></i></td><td>Statement</td><td>Votes</td><td><i class='icon-thumbs-down'></i></td>")));
            this.model.each(function(agreement){
                new AgreementView({ model : agreement, el : table});
            });
            
            table.appendTo(this.$el);
        }

        
    });

    var AgreementView = Backbone.View.extend({
        initialize : function(){
            this.render();
        },

        render : function(){
            var row = $("<tr class='agreement'></tr>");
            new UpView({ model : this.model, el : row });
            new SentenceView({ model : this.model, el : row });
            new VotesView({ model : this.model, el : row });
            new DownView({ model : this.model, el : row });
            row.appendTo(this.$el);
        }
    });

    var UpView = Backbone.View.extend({
        initialize : function(){
            this.render();
            this.model.on("change:_agreements", this.render, this);
        },

        render : function(){
            var td = this.td();
            td.html(this.model.agreements());
        },

        td : function() {
           if (this._td === undefined) {
               this._td = $("<td class='up'></td>");
               this._td.appendTo(this.$el);
           }
           return this._td;
        }
    });

    var SentenceView = Backbone.View.extend({
        initialize : function(){
            this.render();
        },

        render : function(){
            var td = $("<td class='sentence'></td>");
            td.append(this.model.get("sentence").get("text"));
            td.appendTo(this.$el);
        }
    });

    var VotesView = Backbone.View.extend({
        initialize : function(){
            this.render();
            this.model.on("change", this.render, this);
        },

        render : function(){
            var td = this.td();
            td.html(this.model.votes());
        },

        td : function() {
           if (this._td === undefined) {
               this._td = $("<td class='votes'></td>");
               this._td.appendTo(this.$el);
           }
           return this._td;
        }


    });

    var DownView = Backbone.View.extend({
        initialize : function(){
            this.render();
            this.model.on("change:_disagreements", this.render, this);
        },

        render : function(){
            var td = this.td();
            td.html(this.model.disagreements());
        },

        td : function() {
           if (this._td === undefined) {
               this._td = $("<td class='down'></td>");
               this._td.appendTo(this.$el);
           }
           return this._td;
        }

    });

    Electus.Agreement = Agreement;
    Electus.Agreements = Agreements;
    Electus.AgreementsView = AgreementsView;
})(jQuery, _, Backbone, Electus);
