var createHateoas = require("../");
var assert = require("assert");

describe("hateoas.link", function() {
    var hateoas;

    beforeEach(function() {
        hateoas = createHateoas({baseUrl: "http://localhost"});
    });

    it("links by type", function() {
        hateoas.registerLinkHandler("test", function() {
            return {"test": "test"};
        });

        var result = hateoas.link("test", {});
        assert.equal(result.links.test, "test");
    });

    it("links empty collections", function() {
        hateoas.registerCollectionLinkHandler("test", function() {
            return {"test": "test"};
        });

        var result = hateoas.link("test", []);
        assert.equal(result.links.test, "test");
    });

    it("links entities in collections", function() {
        hateoas.registerLinkHandler("test", function() {
            return {"test": "test"};
        });

        var result = hateoas.link("test", [{}]);
        assert.equal(result.data.length, 1);
        assert.equal(result.data[0].links.test, "test");
    });


    it("links collections AND entities", function() {
        hateoas.registerLinkHandler("test", function() {
            return {"test": "test1"};
        });

        hateoas.registerCollectionLinkHandler("test", function() {
            return {"test": "test2"};
        });

        var result = hateoas.link("test", [{}]);
        assert.equal(result.data.length, 1);
        assert.equal(result.data[0].links.test, "test1");
        assert.equal(result.links.test, "test2");
    });
});
