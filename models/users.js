'use strict';

var path = require('path');

var Datastore = require('nedb');

var usersDb = new Datastore({ filename: path.join(__dirname, '../db/users.db'), autoload: true })

module.exports = usersDb;