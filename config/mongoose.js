const mongoose = require('mongoose'); // requiring mongoose

mongoose.connect('mongodb://localhost/todo_list_db'); // connecting to the db running locally on default port

const db = mongoose.connection; // assigning the connection to a variable

db.on('error', console.error.bind(console, 'error connecting to db')); // turning on the db

db.once('open', function() {
  console.log('Successfully connected to the database'); //logging a message on successfully connecting to db
});

module.exports = db;
