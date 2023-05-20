const express = require('express');
const data = require('./data.json');

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

app.get('/project/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const project = data.projects[id];
  res.render('project', { project });
});

app.listen(port, () => console.log(`Listening on port ${port}`));