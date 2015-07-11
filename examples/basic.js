var hateoas = require("../")({baseUrl: "http://localhost:3000"});

var currentUser = {
    id: 123,
    isAdmin: true
};

hateoas.registerLinkHandler("root", function() {
    return {
        "self": "/",
        "users": "/users"
    };
});
 
hateoas.registerLinkHandler("user", function(user) {
    var links = {
        "self": "/users/" + user.id,
    };
 
    if (currentUser.isAdmin) {
        links["delete"] = "/users/" + user.id
    }
 
    return links;
});
 
hateoas.registerCollectionLinkHandler("user", function(userCollection) {
    var links = {
        "self": "/users"
    };
 
    if (currentUser.isAdmin) {
        links["create"] = "/users"
    }

    return links;
});

var users = [
    {
        id: 111
    },
    {
        id: 112,
        isAdmin: true
    }
];
 
console.log(JSON.stringify(hateoas.link("user", users[0])));
 
console.log(JSON.stringify(hateoas.link("user", users)));

// To test, try:

// npm install -g json
// node examples/basic.js  | json -g
