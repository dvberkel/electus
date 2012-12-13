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
