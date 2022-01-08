require('./db/cosmos');
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
var $ = require('jquery');
const { forwardAuthenticated, ensureAuthenticated } = require('./middleware/auth');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

const port = process.env.PORT || 3000
// Passport Config
require('./middleware/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//path for jquery file to be used from the node_module jquery package  
const modulePath = path.join(__dirname, '../node_modules/jquery/dist/');
app.use('/jquery',express.static(modulePath));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//default page load  
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Routes
app.use(require('./routes/users'));
app.use(require('./routes/task'));
// Login Page
app.get('/login', forwardAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '../public', 'login.html')));
// Register Page
app.get('/register', forwardAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '../public', 'register.html')));
// todo Page
app.get('/tasks', ensureAuthenticated, (req, res) =>res.sendFile(path.join(__dirname, '../public', 'task.html')));

app.listen(port, () => {
  console.log(`server running at ${port}`);
});