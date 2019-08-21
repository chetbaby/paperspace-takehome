const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// sample API
app.get('/api', (req, res, next) => {
  axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(response => res.send(response.data));
});

app.listen(8000, () => console.log(`Listening on port 8000!`));
