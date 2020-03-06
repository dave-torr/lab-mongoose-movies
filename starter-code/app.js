require('dotenv').config();

// bring info fromdata array
const CelebData = require('./bin/data')
// brings model from Celebrity
const Celebrity = require('./models/celebrity')

// importing usage for express & Mongoose:
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');


mongoose
    .connect('mongodb://localhost/movies-lab-dev', {useNewUrlParser: true} )
    .then(x => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
      console.error('Error connecting to mongo', err)
    });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));



// default value for title local
app.locals.title = 'Mongo Movies || Express Lab ';


// once route is requested, this renders the page
const index = require('./routes/index');
app.use('/', index);
const celebrities = require('./views/celebrities.hbs');
app.use('/celebrities', celebrities);



// add celebs functions
addCelebs = (CelebData) => {
    for(let cel in CelebData){
        Celebrity.create(CelebData[cel])
        .then(res => console.log('Celebs are created', res.name))
        .catch(err => console.log('error occured', err))
    }
}

// addCelebs(CelebData)

module.exports = app;
