import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  // make sure email and password have been entered
  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  } else {
    // Check if email already exists
    return User.findOne({ email })
    .then((err, post) => {
      if (post) {
        console.log('user name already exists');
        res.status(500).send(err);
      } else {
        // create new user and send to database
        const newUser = new User();
        newUser.email = email;
        newUser.password = password;
        newUser.username = username;

        console.log(username);

        newUser.save().then((newuser) => {
          res.send({ token: tokenForUser(newuser) });
        }).catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
  }
};
