describe("a Statement", function(){
    it("should have a default sentence", function(){
	var statement = new Electus.Statement();

	expect(statement.get("sentence")).toBe("You should come prepared");
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

	it("the container should have a span button", function(){
	    new Electus.StatementView({ model : statement, el : $("#viewport") });

	    expect($("div.statement span.sentence")).toExist();
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
    });
});
