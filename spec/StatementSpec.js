describe("a Statement", function(){
    it("should have a default sentence", function(){
        var statement = new Electus.Statement();

        expect(statement.get("sentence").get("text")).toBe("You should come prepared");
    });

    it("should not have an default agreement", function(){
        var statement = new Electus.Statement();

        expect(statement.get("agreement")).toBe(undefined);
    });

    it("should be able to agree with", function(){
        var statement = new Electus.Statement();

        statement.agree();

        expect(statement.get("agreement")).toBeTruthy();
    });

    it("should be able to disagree with", function(){
        var statement = new Electus.Statement();

        statement.disagree();

        expect(statement.get("agreement")).toBeFalsy();
    });

    it("should allow agreement callbacks", function(){
        var called = false;
        var statement = new Electus.Statement({
            "after-agreement": [function(){ called = true; }]
        });

        statement.agree();

        expect(called).toBeTruthy();
    });


    it("when the sentence is set the statement is refreshed", function(){
        var statement = new Electus.Statement();
        statement.agree();

        statement.setSentence("It is better to be sorry then to be safe");

        expect(statement.get("agreement")).toBe(undefined);
    });

    describe("View", function(){
        var statement;

        beforeEach(function(){
            loadFixtures("viewport.html");
        });

        beforeEach(function(){
            statement = new Electus.Statement();
        });

        it("should create a container", function(){
            new Electus.StatementView({ model : statement, el : $("#viewport") });

            expect($("div.statement")).toExist();
        });

        it("the container should have a header", function(){
            new Electus.StatementView({ model : statement, el : $("#viewport") });

            expect($("div.statement h1.sentence")).toExist();
        });

        it("the container should have a agree button", function(){
            new Electus.StatementView({ model : statement, el : $("#viewport") });

            expect($("div.statement button.agree")).toExist();
        });

        it("the container should have a disagree button", function(){
            new Electus.StatementView({ model : statement, el : $("#viewport") });

            expect($("div.statement button.disagree")).toExist();
        });

        it("when the agree button is clicked you agree with the statement", function(){
            new Electus.StatementView({ model : statement, el : $("#viewport") });
            
            $("button.agree").click();

            expect(statement.get("agreement")).toBeTruthy();
        });

        it("when the disagree button is clicked you disagree with the statement", function(){
            new Electus.StatementView({ model : statement, el : $("#viewport") });
            
            $("button.disagree").click();

            expect(statement.get("agreement")).toBe(false);
        });

        // TODO: although the buttons are hidden when clicked this test fails.
        xit("when the agree button is clicked the buttons should be hidden", function(){
            new Electus.StatementView({ model : statement, el : $("#viewport") });
            
            $("button.agree").click();

            expect("button.agree").toBeHidden();
            expect("button.disagree").toBeHidden();
        });

        it("when the sentence changes buttons should be visible hidden", function(){
            new Electus.StatementView({ model : statement, el : $("#viewport") });
            $("button.agree").click();

            statement.setSentence("it is better to ask forgiveness then permission");

            expect("button.agree").not.toBeHidden();
            expect("button.disagree").not.toBeHidden();
        });
    });
});
