var http = require("http");
var eventEmitter = require("events").EventEmitter;
var feedParser = require("feedparser");

module.exports = new eventEmitter();

var update = function () {http.get("http://www.reddit.com/user/airz23/submitted/.rss", function(response){
	
	var feedMeta;
	var stories = [];

	response.pipe(new feedParser({}))
		.on('error', function(error){
			console.log("error in feed.js");
		})
		.on('meta', function(meta){
			feedMeta = meta;
		})
		.on('readable', function(){
			var stream = this;
			var item;

			while (item = stream.read()){
				stories.push(item);
			}
			//console.log("Loaded a readable in feed.js");
		})
		.on('end', function() {
				module.exports.meta = feedMeta;
				module.exports.stories = stories;
				module.exports.emit('ready');
				console.log("Hello from feed.js: " + stories.length); //Testing
		})

})};

update(); //Initialize on server start-up
setInterval(update,1000 * 60 * 5); //Every 5 minutes