(function($, _, Backbone, Electus){
    var Statement = Backbone.Model.extend({
        defaults : { "sentence" : "You should come prepared" },

        initialize : function(){
            if (! this.has("after-agreement")) {
                this.set("after-agreement", []);
            }
            this.on("change:agreement", function(){
                _.each(this.get("after-agreement"), function(callback){
                    callback.call(this);
                });
            }, this);
        },

        agree : function(){
            this.set("agreement", true);
        },

        disagree : function(){
            this.set("agreement", false);
        }
    });

    var StatementView = Backbone.View.extend({
        initialize : function(){
            this.render();
        },

        render : function(){
            var container = $("<div class='statement'></div>");
            new SentenceView({model : this.model, el : container });
            new AgreeButton({model : this.model, el : container });
            new DisagreeButton({model : this.model, el : container });
            container.appendTo(this.$el);
        }
    });

    var SentenceView = Backbone.View.extend({
        template : _.template("<h1 class='sentence'><%= sentence %></h1>"),

        initialize : function(){
            this.render();
        },

        render : function(){
            var span = $(this.template(this.model.toJSON()));
            span.appendTo(this.$el);
        }
    });

    var AgreeButton = Backbone.View.extend({
        initialize : function(){
            this.model.on("change:agreement", function(){
		$("button.agree, button.disagree").hide();
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
		$("button.agree, button.disagree").hide();
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
