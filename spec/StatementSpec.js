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
    });
});
