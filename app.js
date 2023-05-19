const express = require('express');
const projects = require('./data.json');

const app = express();

app.set('view engine', 'pug');
app.set(express.static('/static', 'public'));