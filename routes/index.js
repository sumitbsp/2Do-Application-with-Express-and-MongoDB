const express = require('express');
const router = express.Router();
const passport = require('passport');
const Todo = require('../models/todo');
const User = require('../models/user');
const {
  createTodo,
  deleteTodo,
  userSignUp,
  updateProfile
} = require('../controller/index');

router.get('/', passport.checkAuthentication, async function(req, res) {
  // Todo.find({}, function(err, todo) {
  //   if (err) {
  //     console.log(err, 'error in fetching todo');
  //   }
  //   return res.render('home', {
  //     todo_list: todo
  //   });
  // }).sort({ priority: 1 });
  let user = await User.findById(req.user.id).populate({
    path: 'todos',
    options: {
      sort: { priority: 1 }
    }
  });
  let todo = user.todos;
  res.render('home', { todo_list: todo });
});

router.get('/sign-in', function(req, res) {
  res.render('sign-in');
});

router.get('/sign-up', function(req, res) {
  res.render('sign-up');
});

router.get('/update-profile', function(req, res) {
  res.render('update-profile');
});

router.get('/log-out', function(req, res) {
  req.logOut();
  res.redirect('/');
});

router.get('/delete-todo/:id', deleteTodo);

router.post('/update-profile', updateProfile);

router.post('/create-user', userSignUp);

router.post('/create-todo', createTodo);

router.post('/delete-todo', deleteTodo);

module.exports = router;
