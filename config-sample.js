var config = {};

config.couchdb = {};
config.twilio = {};

config.couchdb.url = 'https://couchserver';
config.couchdb.port = 443;
config.couchdb.username = 'xxx';
config.couchdb.password = 'yyy';

config.twilio.sid = 'ACxxx';
config.twilio.key = 'yyy';

config.disableTwilioSigCheck = false;

module.exports = config;
