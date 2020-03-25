const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const db = require('./config/mongoose');
const Todo = require('./models/todo');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const Mongostore = require('connect-mongo')(session);
const flash = require('connect-flash');
const mware = require('./config/middleware');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.use(
  session({
    name: 'todo',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100
    },
    store: new Mongostore(
      {
        mongooseConnection: db,
        autoRemove: 'disabled'
      },
      function(err) {
        console.log(err || 'connect-mongodb setup ok');
      }
    )
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(mware.setFlash);

const User = require('./models/user');
app.use('/', require('./routes/index'));

app.listen(port, function(err) {
  if (err) {
    console.log('something went wrong');
  }
  console.log('server is running on port ', port);
});
