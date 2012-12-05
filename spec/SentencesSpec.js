describe("a Sentences", function(){
    it("should have an empty list of sentences", function(){
        var sentences = new Electus.Sentences();
        expect(sentences.length).toBe(0);
    });

    it("should be able to add a sentence ", function(){
        var sentences = new Electus.Sentences();
	sentences.add(new Electus.Sentence({text: "You should become prepared!"}));
        expect(sentences.length).toBe(1);
        expect(sentences.at(0).get("text")).toBe("You should become prepared!");
    });

    it("should be able to add multiple sentences", function(){
        var sentences = new Electus.Sentences();
        sentences.addAll("Sentence one;Sentence two");
        expect(sentences.length).toBe(2);
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

    describe("SentencesView", function() {
      var sentences;
    
      beforeEach(function() {
        loadFixtures("viewport.html");
      });

      beforeEach(function() {
        sentences = new Electus.Sentences();
        sentences.addAll("Sentence One;Sentence Two");
      });

      it("should create a container", function() {
        new Electus.SentencesView({model: sentences, el : $("#viewport") });
        expect($("table.sentences")).toExist();
      });
      
      it("should create sentences in the view", function() {
        new Electus.SentencesView({model: sentences, el : $("#viewport") });
        expect($("table.sentences > tbody > tr")).toExist();
      });
      
      it("should create sentences with buttons in the view", function() {
        new Electus.SentencesView({model: sentences, el : $("#viewport") });
        expect($("table.sentences > tbody > tr > td > button")).toExist();
      });
      
      it("should create an upload button", function() {
        new Electus.SentencesView({model: sentences, el : $("#viewport") });
        expect($("textarea")).toExist();
        expect($("button.upload")).toExist();
      });

      it("should, after upload, contain new sentences ", function() {
        var view = new Electus.SentencesView({model: sentences, el : $("#viewport") });
        $("textarea").val("Sentence1;Sentence2");
        $("button.upload").click();
        expect(view.model.length).toBe(2);
      });

    });
});
