var extend = require('extend');

function hateoas(baseUrl) {
    if (!baseUrl) throw Error("Missing required argument 'baseUrl'");
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
                    return extend(prev, curr);
                }, {});
        }
    }

    function link(type, data) {
        data.links = getLinks(type, data);
    }

    return {
        registerLinkHandler: registerLinkHandler,
        getLinks: getLinks,
        link: link
    };
}

module.exports = hateoas;
