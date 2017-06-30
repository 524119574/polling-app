var Client = require('instagram-private-api').V1;
var _ = require('underscore');
var Promise = require('bluebird');
var device = new Client.Device('leonard.ge');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/leonard.ge.json');
var	convert = require('instagram-id-to-url-segment');
var	urlSegmentToInstagramId = convert.urlSegmentToInstagramId;
var session;
//equals to the first part of id

// Client.Session.create(device, storage, 'leonard.ge', 'gw@524119574')
// 	.then(function(sessionInstance) {
// 		session = sessionInstance;
// 	})
// 	.then(function() {

// 	})
	

Client.Session.create(device, storage, 'leonard.ge', 'gw@524119574')
	.then(function(session) {
		var intervalMin = 1;// do it every 60 mins
		var milliSec = intervalMin*60*1000;
		var likeIntervalMin = 1;
		var likeMilliSec = likeIntervalMin*60*1000;
		setInterval(function() {
			var feed = new Client.Feed.LocationMedia(session, '222651085', 10);
			feed.get().then(function(media) {
				_.each(media, function(medium) {
						console.log(medium._params.webLink);
						return new Client.Request(session)
							.setMethod('POST')
							.setResource('like', {id: urlSegmentToInstagramId(medium._params.code)})
							.generateUUID()
							.setData({
								media_id: urlSegmentToInstagramId(medium._params.code),
								src: "profile"
							})
							.signPayload()
							.send()
							.then(function(data) {
								return new Client.Like(session, {});
							});					
				});
			});
		}, milliSec);
		// var feed = new Client.Feed.TaggedMedia(session, 'Shenzhen', 2);
		// feed.get().then(function(media) {
		// 	_.each(media, function(medium) {
		// 		console.log(medium._params.webLink);
		// 	});
		// });

	})

