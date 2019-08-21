const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { getGist } = require('./APIController');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/updates', getGist, (req, res, next) => res.send(res.locals.data));

app.listen(8000, () => console.log(`Listening on port 8000!`));
