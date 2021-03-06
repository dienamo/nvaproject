require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session       = require('express-session');
const passport      = require('passport');
const MongoStore = require("connect-mongo")(session);

require('dotenv').config();
require('./configs/passport');

const app_name = require('./package.json').name;

mongoose
  .connect((process.env.MONGODB_URI || `mongodb://localhost/${app_name}`), {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
  // store: MongoStore
}));

app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

const cors = require('cors');
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
}));


const index = require('./routes/index');
app.use('/', index);
app.use('/api', require('./routes/auth-routes'));
app.use('/api', require('./routes/car-routes'));
app.use('/api', require('./routes/agency-routes'));
app.use('/api', require('./routes/rental-routes'));
app.use('/api', require('./routes/file-upload'));

// Serve static files from client/build
app.use(express.static(path.join(__dirname, 'client/build')));

// For any other routes: serve client/build/index.html SPA
app.use((req, res, next) => {
  res.sendFile(`${__dirname}/client/build/index.html`), err => {
    if (err) { next(err) }
  }
})
 



module.exports = app;
