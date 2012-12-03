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
	    new AgreeButton({model : this.model, el : container });
	    new DisagreeButton({model : this.model, el : container });
	    container.appendTo(this.$el);
	}
    });

    var AgreeButton = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},

	render : function(){
	    var button = $("<button class='agree'>agree</button>");
	    button.appendTo(this.$el);
	}
    });

    var DisagreeButton = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},

	render : function(){
	    var button = $("<button class='disagree'>disagree</button>");
	    button.appendTo(this.$el);
	}
    });

    Electus.Statement = Statement;
    Electus.StatementView = StatementView;
})(jQuery, _, Backbone, Electus);
