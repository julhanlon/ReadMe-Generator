const fs = require("fs");
const axios = require("axios");

const apiCall = ((username) => {
  axios.get(`https://api.github.com/users/${username}`);
}).then((res) => res);

module.exports = apiCall;
