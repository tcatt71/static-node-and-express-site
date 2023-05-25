const express = require('express');
const data = require('./data.json');
const createError = require('http-errors');

const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use(express.json());

app.locals = data;


// Homepage route
app.get('/', (req, res) => {
  res.render('index');
});

// About me route
app.get('/about', (req, res) => {
  res.render('about');
});

// Individual project route
app.get('/project/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  if (id < data.projects.length) {
    const project = data.projects[id];

    res.render('project', { project });
  } else {
    next();
  }
});

// Page not found route
app.use((req, res, next) => {
  const err = new createError.NotFound('Page cannot be found');

  console.log(err.status, err.message);
  res.render('page-not-found');
});

// All other errors route
app.use((err, req, res, next) => {
  err.status = (err.status || 500);
  err.message = (err.message || res.stausCode);

  console.log(err.status, err.message);
  res.render('error', { err });
});

app.listen(port, () => console.log(`Listening on port ${port}`));