# hateaos
A library to facilitate Hypermedia as the Engine of Application State in Node

Simple guide for getting started. More coming soon...

```javascript
var hateoas = require("hateoas")({baseUrl: "http://localhost:3000"});

hateoas.registerLinkHandler("root", function() {
    return {
        "self": "/",
        "users": "/users"
    };
}

hateoas.registerLinkHandler("user", function(user) {
    var links = {
        "self": "/users/" + user.id,
    };

    if (isAdmin()) {
        links["delete"] = "/users/" + user.id
    }

    return links;
});

hateoas.registerCollectionLinkHandler("user", function(userCollection) {
    var links = {
        "self": "/users"
    };

    if (isAdmin() {
        links["create"] = "/users"
    }
    
    return links;
});

hateoas.link("user", {id: 123});
/*
{
    id: 123,
    links: {
        self: "http://localhost:3000/users/123",
        delete: "http://localhost:3000/users/123"
    }
}
*/


hateoas.link("user", [{id: 123}]);
/*
{
    data: [
        {
            id: 123,
            links: {
                self: "http://localhost:3000/users/123",
                delete: "http://localhost:3000/users/123"
            }
        }
    ],
    links: {
        self: "http://localhost:3000/users",
        create: "http://localhost:3000/users"
    }
*/

```
