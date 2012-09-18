var config = require('./config')
  , utils = require('./utils')
  , cradle = require('cradle')
  , connection = new(cradle.Connection)(config.couchdb.url, config.couchdb.port, {
        auth:{username: config.couchdb.username, password: config.couchdb.password},
        cache: true})
  , events = connection.database('events')

  // query events based on either shortname or phonenumber (both unique keys)

  , findBy = exports.findBy = function(attr, val, callback, retries) {
  	  var retries = (typeof retries !== 'undefined') ? retries : 0;
  	  
  	  events.view('event/by'+utils.initcap(attr), {key: val}, function (err, res) { 
  	      if (err) {
  	          if (retries < 3) {
  	              console.log('Failed to load event, retrying:  ' + attr + ', ' + val);
  	              findBy(attr, val, callback, retries+1);
  	          }
  	          else
  	              var msg = 'Failed to load event, DONE retrying: ' + attr + ', ' + val;
  	              console.log(msg);
  	              callback(msg, null);
  	      }
  	      else {
  	          if (res.length != 1) {
  	            var msg = 'No matching event: ' + attr + ', ' + val;
  	              console.log(msg);
  	              callback(msg, null);
  	          }
  	          else {
  	              var event = res[0].value;  
  	              callback(null, event);                    
  	          }
  	      }          
  	  }); 
  }

  // check to see if this user has voted for this event

  ,	hasVoted = exports.hasVoted = function(event, number) {
    	var retval = false;
      event.voteoptions.forEach(function(vo){
        if (vo.numbers.indexOf(number) >= 0) {
          retval = true;
       	}
    	});
    	return retval;
	}

  // persist the vote to the DB

  ,	saveVote = exports.saveVote = function(event, vote, from, callback) {
  		var index = vote - 1;

  		event.voteoptions[index].votes++;
  		event.voteoptions[index].numbers.push(from);

  		events.save(event._id, event, function(err, res) {
  		    if (err) {
            var msg = 'Failed to save vote for event id = ' + event._id + '. ' + JSON.stringify(err);
  		      console.log(msg);               
  		      callback(msg, null);
          }
  		    else {
  		      callback(null, event.voteoptions[index]);
  		    }

  		});    	

  	};
