//https://secret-hollows-37107.herokuapp.com/

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

//above where we declare our view engine
hbs.registerPartials(__dirname + '/views/partials')


//we're going to install a module that is a wrapper around handlbars
//that lets us use it as an express view engine
//hbs - great view engine
//configure express to use it

app.set('view engine', 'hbs');



//next exists so you can tell express when middleware
//function is done
//req has lots of info about request, see expressjs.com api reference
//see request object
//this is middleware
app.use((req, res, next) => {
  //logger and time stamp
  var now = new Date().toString();


//also going to print file so first add const fs above, then
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  //fs.appendFile('sever.log', log + '\n')

  fs.appendFile('sever.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to sever.log')
    }
  });
  next();
});


// app.use((req, res, next) => {
  // res.render('mainenance.hbs');
// });


//express middleware - app.use is how you call middleware
//takes absolute path to folder you want to serve up
app.use(express.static(__dirname + '/public'));
//dirname stores bath to file


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
  //return 'test'
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})


//http route handlers

//register handlers
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!<h1>');

  //converts to json and sends back to browser
  // res.send({
  //   name: 'Dan',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website.',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  //res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About page',
    //currentYear: new Date().getFullYear()
  });

  //this gets static page rendering
  //res.render('about.hbs')
});


app.get('/projects', (req, res) => {
  //res.send('About page');
  res.render('projects.hbs', {
    pageTitle: 'Projects page',
    //currentYear: new Date().getFullYear()
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


//bind to port on machine
//keeps listening unless told to stop
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
