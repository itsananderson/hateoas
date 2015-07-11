var createHateoas = require("../");
var assert = require("assert");

describe("hateoas with noProps=false", function() {
    var hateoas;

    beforeEach(function() {
        hateoas = createHateoas({baseUrl: "http://localhost", propName: false});
    });

    it("links by type", function() {
        hateoas.registerLinkHandler("test", function() {
            return {"test_url": "test"};
        });

        var result = hateoas.link("test", {});
        assert.equal(result.test_url, "test");
    });

    it("links empty collections", function() {
        hateoas.registerCollectionLinkHandler("test", function() {
            return {"test_url": "test"};
        });

        var result = hateoas.link("test", []);
        assert.equal(result.test_url, "test");
    });

    it("links entities in collections", function() {
        hateoas.registerLinkHandler("test", function() {
            return {"test_url": "test"};
        });

        var result = hateoas.link("test", [{}]);
        assert.equal(result.data.length, 1);
        assert.equal(result.data[0].test_url, "test");
    });


    it("links collections AND entities", function() {
        hateoas.registerLinkHandler("test", function() {
            return {"test_url": "test1"};
        });

        hateoas.registerCollectionLinkHandler("test", function() {
            return {"test_url": "test2"};
        });

        var result = hateoas.link("test", [{}]);
        assert.equal(result.data.length, 1);
        assert.equal(result.data[0].test_url, "test1");
        assert.equal(result.test_url, "test2");
    });
});
