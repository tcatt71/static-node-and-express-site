const express = require('express');
const data = require('./data.json');

const app = express();

app.set('view engine', 'pug');
app.set(express.static('/static', 'public'));

app.use(express.json());

app.get('/', (req, res) => {
  res.locals = data.projects;
  res.render('index');
});