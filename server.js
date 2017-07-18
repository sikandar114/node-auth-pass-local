var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var config = require('./config/database');
var port = process.env.PORT || 3000;
mongoose.connect(config.db,{
    useMongoClient : true
});

require('./config/passport')(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
    secret:'secret123',
    saveUninitialized: true,
    resave:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./routes/routes')(app, passport);

app.listen(port);



