(function($, Electus){
    var statement = new Electus.Statement();

    $(function(){
	new Electus.StatementView({ model : statement, el : $("#viewport") });
    });
})(jQuery, Electus);
