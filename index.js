const express = require('express');     // requiring express
const path = require('path');       // to join path of ejs
const port = 8000;              // assingning port numer for server
const db = require('./config/mongoose');            // requiring mongoose
const Todo = require('./models/todo');              // assingning model to a variable
const app = express();

app.set('view engine', 'ejs');      // setting up app's view engine property to ejs
app.set('views', path.join(__dirname, 'views'));        // joining path
app.use(express.urlencoded());              // used for form data
app.use(express.static('assets'));          // static files will be stored in this dir


app.get('/', function(req, res){                // route for homepage
    Todo.find({}, function(err, todo) {         // fetching the db without any special queries
        if (err) {
            console.log(err, 'error in fetching todo');          // logging any errror
        }
        return res.render('home', {             // renders home.ejs from views
            todo_list: todo                 // the db is sent to the page as todo_list object
        });
    }).sort({priority:1});
});

app.post('/create-todo', function (req, res) {              // route for creating a todo when pressing the add task button
    Todo.create({                   // storing the data in the schema
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        priority: req.body.priority
    }, function(err, newTodo) {
        if (err) {                      // handling error
            console.log('error in creating contact');
            return;
        }
        console.log('********', newTodo);               // logging the todo if successfully stored in db
        return res.redirect('back');                    // refreshing the page
    })
})

app.post('/delete-todo', function (req, res) {          // route for delete the todo from db when pressing the delete button
    let id = req.body.checkbox;                 // objectId of the checkbox is stored in the id variable
    console.log(req.body.checkbox)
    console.log(id.length)
    let newId = []
    id.forEach(function (i, index) {
        newId.push(i.toString());
    });
    for (let i=0; i < newId.length; i++) {
        Todo.findByIdAndDelete(newId[i], function(err) {          // deleting with the objecId
            if (err) {
                console.log(err, 'error in deleting the contact');
            }
        });
         
    }
    return res.redirect('back'); 
    
})


app.listen(port, function(err){             // server listening to port
    if (err) {
        console.log('something went wrong')             // handling error
    }
    console.log('server is running on port ', port);            // logging a message when server is up
})