const express = require("express");
const app = express();
const favicon = require("serve-favicon");

app.set("view engine", "ejs");

app.use(express.urlencoded({exntended: true}));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/images/Dakirby309-Windows-8-Metro-Apps-Calculator-Metro.ico"));
app.get("/", function(req, res){
  res.render("home", {dirname: __dirname});
})

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});