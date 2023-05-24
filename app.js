const express = require('express');
const data = require('./data.json');
const createError = require('http-errors');

const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use(express.json());

app.locals = data;

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  if (id < data.projects.length) {
    const project = data.projects[id];
    res.render('project', { project });
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const err = createError(404, 'Page cannot be found');
  res.render('page-not-found');
  next(err);
});

app.use((err, req, res, next) => {
  res.status = (err.status || 500);
  err.message = (err.message || res.stausCode);

  console.log(res.status, err.message);
  next();
});

app.listen(port, () => console.log(`Listening on port ${port}`));