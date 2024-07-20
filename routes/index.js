var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shopping Cart' });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('index/login', { title: 'Login' });
});

/* GET signup page. */
router.get('/signup', function (req, res, next) {
  res.render('index/signup', { title: 'Sign up' });
});



/* POST signup data. */
router.post('/signup', function (req, res, next) {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body['confirm-password']
  };

  const users = JSON.parse(fs.readFileSync(usersFile));
  const existingUser = users.find(user => user.name === newUser.name || user.email === newUser.email);

  if (existingUser) {
    res.send('<script>alert("This Username or Email already exists!"); window.location.href = "/signup";</script>');
  } else if (newUser.password !== newUser.confirmPassword) {
    res.send('<script>alert("Password and confirm password doesnot match!"); window.location.href = "/signup";</script>');
  } else {
    delete newUser.confirmPassword;
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.send('<script>alert("User registered Successfully!"); window.location.href = "/login";</script>');
    res.redirect('/login');
  }
});

/* POST login data. */
router.post('/login', function (req, res, next) {
  const { name, email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(user => user.name === name && user.password === password);

  if (user) {
    if (name === 'admin' && email === 'admin@gmail.com' && password === 'admin@123') {
      res.redirect('/admin');
    } else {
      res.redirect('/users');
    }
  } else {
    res.send('<script>alert("Invalid Credentials!"); window.location.href = "/login";</script>');
  }
});

module.exports = router;
