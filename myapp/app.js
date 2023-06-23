var cors=require('cors'); //to delete
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var candidatRouter = require('./routes/candidat');
var adminRouter = require('./routes/admin');
var recruiterRouter = require('./routes/recruiter');
var apiRouter = require('./routes/api');

var app = express();

var bodyParser = require('body-parser');

var session = require('express-session');

app.use(cors()); //to delete

app.use(session({
  secret: 'some secret', // une chaîne secrète pour signer le cookie de session
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, // durée de vie du cookie en millisecondes
    httpOnly: false // permet au cookie d'être accessible au serveur lors d'une requête ajax
  }
}));

app.get('/deconnexion', function(req, res) {
  req.session.destroy(function(err) {
    if (err) throw err;
    res.redirect('/'); // rediriger vers la page d'accueil
  });
});

function checkAuth(req, res, next) {
  if (req.session.userid) {
    next();
  } else {
    res.redirect('/login');
  }
}

function checkType(req, res, next) {
  var type = req.session.type;
  var path = req.path;
  var method = req.method;
  if (type === "admin") {// Si le type est admin, il peut accéder à toutes les pages
    if (method === "GET" || path.startsWith("/admin")) {
      next();
    } else {
      res.send("Accès interdit");
    }
  } else if (type === "recruiter") {// Sinon, si le type est recruteur, il ne peut accéder qu'aux pages /recruiter
    if (path.startsWith("/recruiter")) {
      next();
    } else {
      res.redirect("/recruiter");
    }
  } else if (type === "candidat") {// Sinon, si le type est candidat, il ne peut accéder qu'aux pages /candidat
    if (path.startsWith("/candidat")) {
      next();
    } else {
      res.redirect("/candidat");
    }
  } else {// Sinon, il n'est pas authentifié et il est redirigé vers la page de login
    res.redirect("/login");
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-paginate').middleware(5, 5));

app.use('/', indexRouter);
app.use(checkAuth);
app.use(checkType);
app.use('/candidat', candidatRouter);
app.use('/admin', adminRouter);
app.use('/recruiter', recruiterRouter);
app.use('/api', apiRouter);

app.use(bodyParser.urlencoded({ extended: true }));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
