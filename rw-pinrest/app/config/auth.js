'use strict';
module.exports = {
	'twitterAuth': {
		'clientID': process.env.TWITTER_CONSUMER_KEY,
		'clientSecret': process.env.TWITTER_CONSUMER_SECRET,
		'callbackURL': process.env.APP_URL
	},
	'appUrl': process.env.APP_URL
};
