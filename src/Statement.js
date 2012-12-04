(function($, _, Backbone, Electus){
    var Statement = Backbone.Model.extend({
        defaults : { "sentence" : "You should come prepared" },

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
        template : _.template("<span class='sentence'><%= sentence %></span>"),

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
            this.render();
        },

        render : function(){
            var self = this;
            var button = $("<button class='agree'>agree</button>");
            button.click(function(){
                self.model.agree();
            });
            button.appendTo(self.$el);
        }
    });

    var DisagreeButton = Backbone.View.extend({
        initialize : function(){
            this.render();
        },

        render : function(){
            var self = this;
            var button = $("<button class='disagree'>disagree</button>");
            button.click(function(){
                self.model.disagree();
            });
            button.appendTo(self.$el);
        }
    });

    Electus.Statement = Statement;
    Electus.StatementView = StatementView;
})(jQuery, _, Backbone, Electus);
