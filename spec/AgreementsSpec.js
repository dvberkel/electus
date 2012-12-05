describe("Agreements", function(){
    it("should possible to add a sentence agreement",function(){
        var agreements = new Electus.Agreements();
  
        agreements.add();

        expect(agreements.length).toBe(0);
    });

});
