'use strict';

/*
* Express Dependencies
*/
var express = require('express'),
fs = require('fs'),
path = require('path'),
app = express();

var port = 3000;

process.title = 'design-projects';

/*
* Use Handlebars for templating
*/
var hbs = require('express3-handlebars').create({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir: 'views/templates/',
  helpers: require('./views/helpers'),
  partialsDir: 'views/partials/'
});


// For gzip compression
//app.use(express.compress());

app.set('port', process.env.PORT || port);

// Locate the views
app.set('views', __dirname + '/views/pages');

app.engine('hbs', hbs.engine);

// Set Handlebars
app.set('view engine', 'hbs');

// Locate the assets
app.use(express.static(__dirname + '/public'));

/*
* Routes
*/

app.use(app.router);


var controllerDir = path.join(__dirname, '/views/pages/');
fs.readdir(controllerDir, function (err, files) {
  if (err) { throw err; }
  files
  .filter(function (file) { return file.substr(-4) === '.hbs'; })
  .forEach(function (file) {
    try {
      file = file.substring(0, file.indexOf('.'));
      console.log("Listen: ", file);
      app.all('/'+ file, function (request, response, next) {
        var data = {};
        try{
          data = require(path.join(__dirname, '/views/data/', file +".json"));
        }catch (error) { }
        response.render(file, data);
      });
    }catch (e) {
      console.log('Error al cargar el controller: ' + file);
      console.error(e);
    }
  });
});

/*
* Start it up
*/
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
