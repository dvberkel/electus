describe("Agreement", function(){
    var agreement;

    beforeEach(function(){
        agreement = new Electus.Agreement({ 
            sentence : new Electus.Sentence({ text: "You should come prepared" })
        });
    });

    it("should start out with zero positive and negative votes", function(){
        expect(agreement.agreements()).toBe(0);
        expect(agreement.disagreements()).toBe(0);
        expect(agreement.votes()).toBe(0);
    });

    it("should should be possible to agree", function(){
        agreement.agreement(true);

        expect(agreement.agreements()).toBe(1);
        expect(agreement.disagreements()).toBe(0);
        expect(agreement.votes()).toBe(1);
    });

    it("should should be possible to disagree", function(){
        agreement.agreement(false);

        expect(agreement.agreements()).toBe(0);
        expect(agreement.disagreements()).toBe(1);
        expect(agreement.votes()).toBe(1);
    });

    it("should should be possible to register multiple (dis)agreements", function(){
        agreement.agreement(true);
        agreement.agreement(false);
        agreement.agreement(true);

        expect(agreement.agreements()).toBe(2);
        expect(agreement.disagreements()).toBe(1);
        expect(agreement.votes()).toBe(3);
    });
});

describe("Agreements", function(){
    it("should start out without any agreements",function(){
        var agreements = new Electus.Agreements();
  
        expect(agreements.length).toBe(0);
    });
    
    it("should be possible to add an agreement", function() {
        var agreements = new Electus.Agreements();

        agreements.addAgreements("You should come prepared", true);

        expect(agreements.length).toBe(1);
    });
    
    it("should be possible to add an disagreement", function(){
        var agreements = new Electus.Agreements();

        agreements.addAgreements("You should come prepared", false);

        expect(agreements.length).toBe(1);
    });
    
    it("should votes should be tallied", function(){
        var agreements = new Electus.Agreements();

        agreements.addAgreements("You should come prepared", true);
        agreements.addAgreements("It is better to ask forgiveness then permission", false);
        agreements.addAgreements("You should come prepared", false);
        agreements.addAgreements("You should come prepared", true);
        agreements.addAgreements("It is better to ask forgiveness then permission", false);
        
	expect(agreements.length).toBe(2);
        var agreement = agreements.agreementWithText("You should come prepared");
        expect(agreement).toBeDefined();
        expect(agreement.agreements()).toBe(2);
        expect(agreement.disagreements()).toBe(1);
	expect(agreement.votes()).toBe(3);
    });


    describe("AgreementsView", function(){
	var agreements;
	
	beforeEach(function(){
	    loadFixtures("viewport.html");
	});

	beforeEach(function(){
	    agreements = new Electus.Agreements();
	    agreements.addAgreements("You should come prepared", false);
	});
	
	it("should create a container", function(){
	    new Electus.AgreementsView({ model : agreements, el : $("#viewport") });
	    
	    expect($("table.agreements")).toExist();
	});

	it("should have a table row for each model", function(){
	    new Electus.AgreementsView({ model : agreements, el : $("#viewport") });
	    
	    expect($("table.agreements tr.agreement")).toExist();
	});

	it("each row should have an upvote cell", function(){
	    new Electus.AgreementsView({ model : agreements, el : $("#viewport") });
	    
	    expect($("table.agreements tr.agreement td.up")).toExist();
	});

	it("each row should have an upvote sentence cell", function(){
	    new Electus.AgreementsView({ model : agreements, el : $("#viewport") });
	    
	    expect($("table.agreements tr.agreement td.sentence")).toExist();
	});

	it("each row should have an votes cell", function(){
	    new Electus.AgreementsView({ model : agreements, el : $("#viewport") });
	    
	    expect($("table.agreements tr.agreement td.votes")).toExist();
	});

	it("each row should have an downvote cell", function(){
	    new Electus.AgreementsView({ model : agreements, el : $("#viewport") });
	    
	    expect($("table.agreements tr.agreement td.down")).toExist();
	});
    });
});
