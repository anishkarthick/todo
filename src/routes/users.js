const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated, ensureAuthenticated } = require('../middleware/auth');

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.send({ msg: 'Please enter all fields' });
  }

  User.findOne({ email: email }).then(user => {
    if (user) {

      res.send({ msg: 'Email already exists' });

    } else {
      const newUser = new User(req.body);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
                 res.status(200).json({msg:'success'});
            })
       .catch(err => res.json({msg:"error"}));
        });
      });
    }
  });
})

//  login
router.post('/login',forwardAuthenticated, function(req, res, next ){
  passport.authenticate("local", function(error, user, info) {
    if (error) {
        return res.status(500).json(error);
    }
    if (!user) {
        return res.status(401).json(info.message);
    }
    req.login(user, function (err) {
        if (err) {
            return res.status(500).json(error);
        } else {
            return res.status(200).json({msg:"success"});
        }
    });
})(req, res, next);  
});

//Logout
router.post('/logout',ensureAuthenticated,(req, res) => {
 req.session.destroy(function (err) {
  res.status(200).json({msg:"success"});
  });
});

module.exports = router;
