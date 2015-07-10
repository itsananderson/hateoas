var extend = require('extend');

var defaultOptions = {
    propName: "links"
};

function hateoas(options) {
    options = extend({}, defaultOptions, options);
    if (!options.baseUrl) {
        throw Error("Missing required argument 'baseUrl'");
    }

    var linkHandlers = {};

    function registerLinkHandler(type, handler) {
        if (!linkHandlers[type]) {
            linkHandlers[type] = [];
        }
        linkHandlers[type].push(handler);
    }

    function getLinks(type, data) {
        if (linkHandlers[type]) {
            return linkHandlers[type]
                .map(function(handler) {
                    return handler(data, type);
                })
                .reduce(function(prev, curr) {
                    return extend({}, prev, curr);
                }, {});
        }
    }

    function link(type, data) {
        data[options.propName] = getLinks(type, data);
    }

    return {
        registerLinkHandler: registerLinkHandler,
        getLinks: getLinks,
        link: link
    };
}

module.exports = hateoas;
