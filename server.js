/* ===================
   Import Node Modules
=================== */
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application
const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise;
const config = require('./config/config'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths
const authentication = require('./backend/routes/authentication')(router); // Import Authentication Routes
const blogs = require('./backend/routes/blogs')(router); // Import Blog Routes
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

// Database Connection
mongoose.connect(config.database, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(path.join(__dirname + '/dist/StackOverflow-App'))); // Provide static directory for frontend
app.use('/authentication', authentication); // Use Authentication routes in application
app.use('/blogs', blogs); // Use Blog routes in application

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/StackOverflow-App/index.html'));
});

// Start Server: Listen on port 8080
app.listen(config.port, function (err) {
    if (err) {
        console.log('error found in server start' + err);
    } else {
        console.log("connected to server at port " + config.port);
    }
});
