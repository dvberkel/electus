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
            if (agreement) {
                this.set("_agreements", this.get("_agreements") + 1);
            } else {
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
        },

        render : function(){
            var table = $("<table class='agreements table table-striped table-bordered table-condensed'></table>");
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
        },

        render : function(){
            var td = $("<td class='up'></td>");
            td.append(this.model.agreements());
            td.appendTo(this.$el);
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
        },

        render : function(){
            var td = $("<td class='votes'></td>");
            td.append(this.model.votes());
            td.appendTo(this.$el);
        }
    });

    var DownView = Backbone.View.extend({
        initialize : function(){
            this.render();
        },

        render : function(){
            var td = $("<td class='down'></td>");
            td.append(this.model.disagreements());
            td.appendTo(this.$el);
        }
    });

    Electus.Agreement = Agreement;
    Electus.Agreements = Agreements;
    Electus.AgreementsView = AgreementsView;
})(jQuery, _, Backbone, Electus);