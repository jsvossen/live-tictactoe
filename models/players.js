'use strict';

var path = require('path');

var Datastore = require('nedb');

var playersDb = new Datastore({ filename: path.join(__dirname, '../db/players.db'), autoload: true })

playersDb.ensureIndex({ fieldName: 'mark', unique: true }, function (err) {
	console.log(err);
});

//init player db
playersDb.insert(
	[
		{ mark: "X", uid: "", active: true }, 
		{ mark: "O", uid: "", active: false }
	], 
	function (err) {
  		console.log(err);
	}
);

module.exports = playersDb;