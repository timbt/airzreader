//feed.js -- part of airzreader by Tim Beattie (github.com/timbt).

var http = require("http"); //Used to get RSS feed
var eventEmitter = require("events").EventEmitter; //Idk this makes javascript stuff async stuff work
var feedParser = require("feedparser"); 

module.exports = new eventEmitter(); //Wrapping the export module as an event emitter allows asynchronous execution in other scripts once this script has successfully loaded and parsed the feed.

var update = function () {http.get("http://www.reddit.com/user/airz23/submitted/.rss", function(response){
	
	var feedMeta; //Store metadata. Just in case y'know.
	var stories = []; //Main array to hold loaded articles.

	response.pipe(new feedParser({}))
		.on('error', function(error){
			console.log("error in feed.js"); //Log if feed load unsuccessful.
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
				//console.log("Hello from feed.js: " + stories.length); //Used for testing
		})

})}; //Async is messy

update(); //Initialize on server start-up
setInterval(update,1000 * 60 * 5); //Every 5 minutes