const axios = require('axios');

const UPDATE_GIST =
  'https://api.github.com/gists/132199f9a8a933db7f39121dc424062b';

module.exports = {
  getGist: (req, res, next) => {
    axios
      .get(UPDATE_GIST)
      .then(response => {
        res.locals.data = response.data;
        // res.locals.data = response.data.files['updates.md'].content;
        // res.locals.data.updates = Array.from(response.data.history).length;
        return next();
      })
      .catch(err => console.error(err));
  },
};
