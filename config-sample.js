var config = {};

config.couchdb = {};
config.twilio = {};

config.couchdb.url = 'https://couchserver';
config.couchdb.port = 443;
config.couchdb.username = 'xxx';
config.couchdb.password = 'yyy';

config.twilio.sid = 'ACxxx';
config.twilio.key = 'yyy';
config.twilio.smsWebhook = 'https://nodeserver/vote/sms';
config.twilio.voiceWebhook = 'https://nodeserver/vote/voice';
config.disableTwilioSigCheck = false;

module.exports = config;
