var express = require("express");
var port = process.env.PORT || 3000;
var hateoas = require("../../")({baseUrl: "http://localhost:" + port});

var app = express();

var users = {
    111: {
        id: 111,
        name: "test111"
    },
    112: {
        id: 112,
        name: "test112"
    }
};

function userList() {
    return Object.keys(users).map(function(key) {
        return users[key];
    });
}

hateoas.registerLinkHandler("root", function() {
    return {
        "self": "/",
        "users": "/users",
    };
});

hateoas.registerLinkHandler("user", function(user) {
    return {
        "self": "/users/" + user.id,
        "delete": "/users/" + user.id
    };
});

hateoas.registerCollectionLinkHandler("user", function(userCollection) {
    return {
        "self": "/users",
        "create": "/users"
    };
});

app.get("/", function(req, res) {
    res.send(hateoas.link("root", {}));
});

app.get("/users", function(req, res) {
    res.send(hateoas.link("user", userList()));
});

app.get("/users/:user_id", function(req, res) {
    res.send(hateoas.link("user", users[req.params.user_id]));
});


app.delete("/users/:user_id", function(req, res) {
    delete users[req.params.user_id];
    res.status(204).send();
});

app.listen(port);

console.log("Listening on port " + port);
