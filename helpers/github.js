const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user.username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  }

  request.get(options, function(error, response, body) {
    console.log('error: ', error);
    console.log('statusCode: ', response && response.statusCode);
    //console.log('body: ', JSON.parse(body));
    cb(error, response, JSON.parse(body));
  })
  //return result;
  //console.log(options, 'name used: ', user)
}

module.exports.getReposByUsername = getReposByUsername;