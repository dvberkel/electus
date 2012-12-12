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

    var AgreeButton = Backbone.View.extend({
        initialize : function(){
            this.model.on("change:sentence", function(){
                this.button().show();
            }, this);
            this.model.on("change:agreement", function(){
                this.button().hide();
            }, this);
            this.render();
        },

        render : function(){
            var self = this;
            var button = this.button();
            button.click(function(){
                self.model.agree();
            });
        },

        button : function(){
            if (this._button === undefined) {
                this._button = $("<button class='agree btn btn-large btn-success'>agree</button>");
                this._button.appendTo(this.$el);

                if (this.model.get("agreement") !== undefined) {
                    this._button.hide();
                }
            }
            return this._button;
        }
    });

    var DisagreeButton = Backbone.View.extend({
        initialize : function(){
            this.model.on("change:sentence", function(){
                this.button().show();
            }, this);
            this.model.on("change:agreement", function(){
                this.button().hide();
            }, this);
            this.render();
        },

        render : function(){
            var self = this;
            var button = this.button();
            button.click(function(){
                self.model.disagree();
            });
        },

        button : function(){
            if (this._button === undefined) {
                this._button = $("<button class='disagree btn btn-large btn-danger'>disagree</button>");
                this._button.appendTo(this.$el);

                if (this.model.get("agreement") !== undefined) {
                    this._button.hide();
                }
            }
            return this._button;
        }
    });

    Electus.Statement = Statement;
    Electus.StatementView = StatementView;
})(jQuery, _, Backbone, Electus);
