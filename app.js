const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

var size;

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/game", (req, res) => {
    res.render("game", {size: size , noOfPlayers: noOfPlayers});
});

app.post("/", (req, res) => {
    size = Number(req.body.size);
    noOfPlayers = Number(req.body.noOfPlayers);
    res.redirect("/game");
});

app.post("/action", (req, res) => {
    const action = req.body.action;
    if(action === "restart") {
        res.redirect("/game");
    } else if(action === "new") {
        res.redirect("/");
    }
});

app.listen("3000", () => {});