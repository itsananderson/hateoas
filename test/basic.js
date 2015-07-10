var createHateoas = require("../");
var assert = require("assert");

describe("hateoas", function() {
    it("can be called", function() {
        var hateoas = createHateoas({baseUrl: "http://localhost/"});
        assert(hateoas);
    });

    it("throws for missing baseUrl", function() {
        assert.throws(function() {
            var hateoas = createHateoas();
        }, "Should have thrown for missing baseUrl");
    });
});
