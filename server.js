const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const authentication = require('./routes/authentication')(router);
const dashboard = require('./routes/dashboard')(router);
const project = require('./routes/project')(router);
const task = require('./routes/task')(router);
const bug = require('./routes/bug')(router);

// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could not connect mongo: ', err);
  } else {
    console.log('Connected to mongo: ' + config.db);
  }
});

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use('/authentication', authentication);
app.use('/posts', dashboard);
app.use('/projects', project);
app.use('/tasks', task);
app.use('/bugs', bug);

app.listen(8080, function(err) {
  if (err){
    console.log('Error listening on port 8080');
  }
  console.log('Listening on port 8080');
});
