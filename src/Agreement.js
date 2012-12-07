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
