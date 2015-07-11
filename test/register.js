var createHateoas = require("../");
var assert = require("assert");

var hateoas;

describe("hateoas link registration", function() {
    beforeEach(function() {
        hateoas = createHateoas({baseUrl: "http://localhost/"});
    });

    it("works", function() {
        hateoas.registerLinkHandler("test", function(data) {
            return {"test": "test"};
        });
        var links = hateoas.getLinks("test", null);
        assert.equal(Object.keys(links).length, 1); //, "Invalid number of links returned"
        assert.equal(links.test, "test", "Expected 'test' link to have value 'test'");
    });

    it("appends baseUrl", function() {
        hateoas.registerLinkHandler("test", function(data) {
            return {"test": "/test"};
        });
        var links = hateoas.getLinks("test", null);
        assert.equal(links.test, "http://localhost/test", "Expected 'test' link to have value 'http://localhost/test'");
    });
});
