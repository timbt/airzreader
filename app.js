var feed = require("./src/feed.js");

feed.on('ready', function(){
	console.log(feed.stories[0].title);
});