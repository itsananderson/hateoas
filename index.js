var extend = require('extend');

var defaultOptions = {
    propName: "links"
};

function hateoas(options) {
    options = extend({}, defaultOptions, options);
    if (!options.baseUrl) {
        throw Error("Missing required argument 'baseUrl'");
    }

    if (options.baseUrl[options.baseUrl.length-1] == "/") {
        options.baseUrl = options.baseUrl.substring(0, options.baseUrl.length-1);
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
            var links = linkHandlers[type]
                .map(function(handler) {
                    return handler(data, type);
                })
                .reduce(function(prev, curr) {
                    return extend({}, prev, curr);
                }, {});
            return Object.keys(links).reduce(function(prev, key) {
                var value = links[key];
                if (value.length && value[0] === "/") {
                    value = options.baseUrl + value;
                }
                prev[key] = value;
                return prev;
            }, {});
        } else {
            return {};
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
