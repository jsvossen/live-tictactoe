'use strict';

//from https://github.com/valera-rozuvan/simple-express-js-with-db

var express = require('express'),
  path = require('path'),
  usersModel = require('../models/users.js'),
  playersModel = require('../models/players.js'),
  router = express.Router();

/*USER ROUTES (crud)*/

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

/*PLAYER ROUTES (read/update only)*/

router.route('/players')
  //list all players
  .get(function(req, res) {
    playersModel.find({}, function(err, players) {
      if (err) {
        res.send(err);

        return;
      }

      res.json(players);
    });
  });

//find player by user id
router.route('/players/user/:uid')
  //update player
  .post(function(req, res) {
    playersModel.findOne({
      uid: req.params.uid
    }, function(err, player) {
      var prop;

      if (err) {
        res.send(err);

        return;
      }

      if (player === null) {
        res.json({
          type: 'error',
          message: 'Did not find a user with "id" of "' + req.params.uid + '".'
        });

        return;
      }

      for (prop in req.body) {
        if (prop !== '_id') {
          player[prop] = req.body[prop];
        }
      }

      playersModel.update({
        _id: player._id
      }, player, {}, function(err, numReplaced) {
        if (err) {
          res.send(err);

          return;
        }

        res.json({
          type: 'success',
          message: 'Replaced ' + numReplaced + ' user(s).',
          player: player
        });
      });
    });
  })
  //show player
  .get(function(req, res) {
    playersModel.findOne({
      uid: req.params.uid
    }, function(err, player) {
      if (err) {
        res.send(err);
        console.log(err);
        return;
      }

      if (player === null) {
        res.json({
          type: 'error',
          message: 'Did not find a user with "id" of "' + req.params.uid + '".'
        });

        return;
      }

      res.json(player);
    });
  });

  //find player by mark
router.route('/players/mark/:mark')
  //update player
  .post(function(req, res) {
    playersModel.findOne({
      mark: req.params.mark
    }, function(err, player) {
      var prop;

      if (err) {
        res.send(err);

        return;
      }

      if (player === null) {
        res.json({
          type: 'error',
          message: 'Did not find a user with "mark" of "' + req.params.mark + '".'
        });

        return;
      }

      for (prop in req.body) {
        if (prop !== '_id') {
          player[prop] = req.body[prop];
        }
      }

      playersModel.update({
        _id: player._id
      }, player, {}, function(err, numReplaced) {
        if (err) {
          res.send(err);
          console.log(err);
          return;
        }

        res.json({
          type: 'success',
          message: 'Replaced ' + numReplaced + ' user(s).',
          player: player
        });
      });
    });
  })
  //show player
  .get(function(req, res) {
    playersModel.findOne({
      mark: req.params.mark
    }, function(err, player) {
      if (err) {
        res.send(err);

        return;
      }

      if (player === null) {
        res.json({
          type: 'error',
          message: 'Did not find a user with "mark" of "' + req.params.mark + '".'
        });

        return;
      }

      res.json(player);
    });
  });

module.exports = router;
