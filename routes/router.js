'use strict';

//from https://github.com/valera-rozuvan/simple-express-js-with-db

var express = require('express'),
  path = require('path'),
  usersModel = require('../models/users.js'),
  router = express.Router();

router.route('/users')
  //list all users
  .get(function(req, res) {
    usersModel.find({}, function(err, users) {
      if (err) {
        res.send(err);

        return;
      }

      res.json(users);
    });
  })
  //create new users
  .post(function(req, res) {
    var postData = req.body;
    // var validationError = {
    //     type: 'Validation Error',
    //     message: ''
    //   };

    // if (!postData.username) {
    //   validationError.message = 'username is required';
    // }
    // if (!postData.password) {
    //   validationError.message = 'password is required';
    // }
    // if (!postData.email) {
    //   validationError.message = 'email is required';
    // }

    // if (validationError.message) {
    //   res.json(validationError);

    //   return;
    // }

    usersModel.insert(postData, function(err, newUser) {
      if (err) {
        res.send(err);

        return;
      }
      res.json(newUser);
    });
  });

router.route('/users/:id')
  //update user
  .put(function(req, res) {
    usersModel.findOne({
      _id: req.params.id
    }, function(err, user) {
      var prop;

      if (err) {
        res.send(err);

        return;
      }

      if (user === null) {
        res.json({
          type: 'error',
          message: 'Did not find a user with "id" of "' + req.params.id + '".'
        });

        return;
      }

      for (prop in req.body) {
        if (prop !== '_id') {
          user[prop] = req.body[prop];
        }
      }

      usersModel.update({
        _id: user._id
      }, user, {}, function(err, numReplaced) {
        if (err) {
          res.send(err);

          return;
        }

        res.json({
          type: 'success',
          message: 'Replaced ' + numReplaced + ' user(s).'
        });
      });
    });
  })
  //show user
  .get(function(req, res) {
    usersModel.findOne({
      _id: req.params.id
    }, function(err, user) {
      if (err) {
        res.send(err);

        return;
      }

      if (user === null) {
        res.json({
          type: 'error',
          message: 'Did not find a user with "id" of "' + req.params.id + '".'
        });

        return;
      }

      res.json(user);
    });
  })
  //delete user
  .delete(function(req, res) {
    usersModel.remove({
      _id: req.params.id
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json({
        type: 'success',
        message: 'Successfully deleted user with id "' + req.params.id + '".'
      });
    });
  });

module.exports = router;
