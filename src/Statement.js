(function($, _, Backbone, Electus, undefined){
    var Statement = Backbone.Model.extend({
        initialize : function(){
            if (! this.has("sentence")) {
                this.set("sentence", new Electus.Sentence({ text : "You should come prepared" }));
            }
            if (! this.has("after-agreement")) {
                this.set("after-agreement", []);
            }
            this.on("change:agreement", function(){
                _.each(this.get("after-agreement"), function(callback){
                    callback.call(this);
                });
            }, this);
            this.get("sentence").on("change:text", function(){
                this.refresh();
            }, this);
        },

        refresh: function(){
            this.set({"agreement": undefined}, {silent:true});
        },

        agree : function(){
            this.set("agreement", true);
        },

        disagree : function(){
            this.set("agreement", false);
        },

        setSentence : function(text){
            this.get("sentence").set("text", text);
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
            this.model.on("change:agreement", function(){
                if (this.model.get("agreement") === undefined) {
                    $("button.agree, button.disagree").show();
                } else {
                    $("button.agree, button.disagree").hide();
                }
            }, this);
            this.render();
        },

        render : function(){
            var self = this;
            var button = this.button();
            button.click(function(){
                self.model.agree();
            });
            button.appendTo(self.$el);
        },

        button : function(){
            if (this._button === undefined) {
                this._button = $("<button class='agree btn btn-large btn-success'>agree</button>");
            }
           return this._button;
        }
    });

    var DisagreeButton = Backbone.View.extend({
        initialize : function(){
            this.model.on("change:agreement", function(){
                if (this.model.get("agreement") === undefined) {
                    $("button.agree, button.disagree").show();
                } else {
                    $("button.agree, button.disagree").hide();
                }
            }, this);
            this.render();
        },

        render : function(){
            var self = this;
            var button = this.button();
            button.click(function(){
                self.model.disagree();
            });
            button.appendTo(self.$el);
        },

        button : function(){
            if (this._button === undefined) {
                this._button = $("<button class='disagree btn btn-large btn-danger'>disagree</button>");
            }
           return this._button;
        }
    });

    Electus.Statement = Statement;
    Electus.StatementView = StatementView;
})(jQuery, _, Backbone, Electus);
