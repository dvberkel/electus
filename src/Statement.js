(function(_, Backbone, Electus){
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
	    this.$el.append("<div class='statement'></div>");
	}
    });

    Electus.Statement = Statement;
    Electus.StatementView = StatementView;
})(_, Backbone, Electus);
