const express = require("express");
var routes = require('./routes/reg');
var app = express();

app.use('/',routes);
app.listen(8080, () => console.log("Server listening on port 8080!"));

module.exports=app;