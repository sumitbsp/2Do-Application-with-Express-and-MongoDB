const Todo = require('../models/todo');
const User = require('../models/user');

module.exports = {
  createTodo(req, res) {
    User.findById(req.user.id, function(err, user) {
      Todo.create(
        {
          description: req.body.description,
          category: req.body.category,
          date: req.body.date,
          priority: req.body.priority,
          user: req.user.id
        },
        function(err, newTodo) {
          if (err) {
            console.log('error in creating contact');
            return;
          }
          user.todos.push(newTodo);
          user.save();
          console.log('********', newTodo);
          return res.redirect('back');
        }
      );
    });
  },

  async deleteTodo(req, res) {
    let id = req.params.id;
    await Todo.findByIdAndDelete(id);
    console.log(req.user._id);
    User.findByIdAndUpdate(
      req.user._id,
      { $pull: { todos: req.params.id } },
      function(err, todo) {
        return res.redirect('back');
      }
    );
  },

  userSignUp(req, res) {
    if (req.body.password === req.body.confirmPassword) {
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        },
        function(err, user) {
          if (err) {
            console.log('error');
            return;
          }
          console.log(user);
          return res.redirect('/sign-in');
        }
      );
    } else {
      return res.redirect('back');
    }
  },

  async updateProfile(req, res) {
    if (req.body.password === req.body.confirmPassword) {
      let user = await User.findByIdAndUpdate(req.user.id, req.body);
      return res.redirect('/');
    }
  }
};
