const express = require('express');
const save = require('../database/index.js');
const find = require('../database/index.js');
const getReposByUsername = require('../helpers/github.js');

let app = express();
let bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  //invoke getReposByUsername here

  getReposByUsername.getReposByUsername(req.body, function(err, response, body){ //1st param: user search username to GIT, secondparam: sending data to database
    //console.log('-------------atGetREPOS serverside: ', JSON.parse(body)[0])
    var repoNumber = 25
    var repoIdList = []
    if (body.length < 25){
      repoNumber = body.length
      //console.log('-----------reponum---->', repoNumber)
    }
    for (var i = 0; i < body.length; i++){
      if (!repoIdList.includes(body[i].id)){
        repoIdList.push(body[i].id)
      }
    }
    for (var i = 0; i < repoNumber; i++) {
      //console.log(repoIdList.includes(body[i].id))
      if (repoIdList.includes(body[i].id)){
        save.save(body[i]);
      }
    }
  })
  
  res.status(200).end()
});

app.get('/', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  //console.log(find())
  console.log('get is working')
  res.send(find.find(function(data,err){
    if(err){
      console.error(err)
    }else{
      console.log('--this is the data from ressend-->', data)
      return data
    }
  }))
  res.end(data)
  // res.end(find.find(function(data, err){
  //   if (err){
  //     console.error(err)
  //   }else{
  //     console.log('data as page reloads', data)

  //   }
  //}))
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});