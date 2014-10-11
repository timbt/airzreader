var http = require("http");
var eventEmitter = require("events").EventEmitter;
var feedParser = require("feedParser");

var feedMeta;
var stories = [];

module.exports = new eventEmitter();

http.get("http://www.reddit.com/user/airz23/submitted/.rss", function(response){
	
	response.pipe(new feedParser({}))
		.on('error', function(error){
			//console.log(error);
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
		})
		.on('end', function() {
				module.exports.meta = feedMeta;
				module.exports.stories = stories;
				module.exports.emit('ready');
		})

});

