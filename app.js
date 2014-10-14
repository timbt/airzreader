var express = require("express");
var app = express();


//function fetchFeed(){}
var feed = require("./src/feed.js");
var doc = "";

feed.on('ready', function(){

	//console.log("ready");
	doc = "";

	feed.stories.forEach(function(story){
		doc += "<h2>" + story.title + "</h2>";
		doc += story.description;
		//console.log("looped");
	});
});

app.get("/", function (request, response){

	console.log("connection detected.");
	response.send(doc);
	//response.send("test");
});

var server = app.listen(process.env.PORT || 5000, function(){
	console.log("Listening on port %d", server.address().port);
});