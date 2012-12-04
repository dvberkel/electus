describe("a Sentences", function(){
    it("should have an empty list of sentences", function(){
        var sentences = new Electus.Sentences();
        expect(sentences.models.length).toBe(0);
    });

    it("should be able to add a sentence ", function(){
        var sentences = new Electus.Sentences();
	sentences.add(new Electus.Sentence({text: "You should become prepared!"}));
        expect(sentences.models.length).toBe(1);
        expect(sentences.models[0].get("text")).toBe("You should become prepared!");
    });

    it("should be able to add multiple sentences", function(){
        var sentences = new Electus.Sentences();
        sentences.addAll("Sentence one;Sentence two");
        expect(sentences.models.length).toBe(2);
    });

    describe("SentenceView", function() {
        var sentence;

        beforeEach(function(){
            loadFixtures("viewport.html");
        });

        beforeEach(function(){
            sentence = new Electus.Sentence();
        });

        it("should create a container", function(){
            new Electus.SentenceView({ model : sentence, el : $("#viewport") });
            expect($("h1.sentence")).toExist();
        });
    });
});
