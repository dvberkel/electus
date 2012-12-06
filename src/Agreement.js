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
    
    var Agreements = Backbone.Collection.extend({});

    Electus.Agreement = Agreement;
    Electus.Agreements = Agreements;
})(jQuery, _, Backbone, Electus);