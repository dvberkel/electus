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
    it("should possible to add a sentence agreement",function(){
        var agreements = new Electus.Agreements();
  
        expect(agreements.length).toBe(0);
    });

});
