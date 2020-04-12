// routes/auth-routes.js

const express    = require('express');
const authRoutes = express.Router();
const mongoose = require('mongoose');
const passport   = require('passport');
const bcrypt     = require('bcryptjs');
const crypto = require("crypto");


// require the user model !!!!
const User       = require('../models/User');

var nodemailer = require('nodemailer');

authRoutes.post('/signup', (req, res, next) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;
    // const userStatus = req.body.userStatus

    // const {name, lastname, username, password, phonenumber, address} = req.body
    
  
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    if(password.length < 7){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }
  
    User.findOne({ username }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "username check went bad."});
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: 'username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new User({
            name,
            lastname,
            username,
            password: hashPass,
            phonenumber,
            address,
            // userStatus
        });

        aNewUser.save(err => {
            if (err) {
                console.error('Saving user to database went wrong.') // Pour afficher l'erreur en console au cas où
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'nvisioauto@gmail.com',
                  pass: 'hbzytesdluptbsqc'
                }
              });
            var mailOptions = {
                from: 'nvisioauto@gmail.com',
                to: aNewUser.username,
                subject: 'Bienvenue chez NVA',
                html: `<h1>Merci ${aNewUser.name}</h1><p>Nous sommes heureux de vous compter parmi nous.</p>`
              };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});


authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
    
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            // We are now logged in (thats why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});

authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});

authRoutes.put('/user/:id', (req, res, next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    User.findByIdAndUpdate(req.params.id, req.body)
      .populate('rentals')
      .then((response) => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      })
  })

authRoutes.post('/forgotPassword' , (req, res, next) => {
  if(req.body.email === '') {
    res.status(400).send('email required');
  }
  console.error(req.body.email);
  User.findOne({
      username : req.body.email
  })
  .then(user=>{
    if (!user) {
      console.error('username not in database')
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      User.findByIdAndUpdate(user._id , {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      },{new: true})
      .then(user=>{
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'nvisioauto@gmail.com',
            pass: 'hbzytesdluptbsqc'
          }
        });
        const mailOptions = {
            from: 'nvisioauto@gmail.com',
            to: user.username,
            subject: 'Lien de réinitialisation de mot de passe',
            html: `http://localhost:3000/reset/${token}`
          };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
      })
    }
  })
})

authRoutes.get('/reset' , (req , res , next)=>{
  User.findOne({
    resetPasswordToken: req.query.resetToken,
    resetPasswordExpires: {$gt: Date.now()
    }
  })
  .then(user=>{
    if(!user) {
      console.log('Le lien de réinitialisation du mot de passe st invalide ou a expiré')
      res.json('Le lien de réinitialisation du mot de passe st invalide ou a expiré')
    } else {
      res.status(200).send({
        username: user.username,
        message: 'password reset link a-ok'
      })
    }
  })
})

authRoutes.put('/updatePassword' ,(req,res,next)=>{
  const password = req.body.password
  User.findOne({username: req.body.username})
    .then(user=>{
      if(user) {
        console.log('user exist in db')
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        User.findByIdAndUpdate(user._id , {
          password: hashPass,
          resetPasswordToken: null,
          resetPasswordExpires: null
        })
        .then(()=>{
          console.log('password updated');
          res.status(200).send({message: 'password updated'})
        })
      } else {
        res.status(404).json('no user exist in db to update')
      }
    })
})

module.exports = authRoutes;