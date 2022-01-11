const express = require('express');
const bodyParser = require('body-parser');

// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
const fs = require('fs');

// configure our express instance with some body-parser settings
// including handling JSON data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handling the various routes 
const routes = require('./routes/routes.js')(app, fs);

// finally, launch our server on port 3001.
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});