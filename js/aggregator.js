(function($, Electus){
    var socket = io.connect('http://techopinion.jit.su');
    var agreements = new Electus.Agreements();
    socket.on('agreement', function (data) {
        console.log (data);
        agreements.addAgreements(data.sentence.text, data.agreement);
    });


    $(function(){
	new Electus.AgreementsView({ model : agreements, el : $("#viewport") });
    });
})(jQuery, Electus);
