const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  id: String,
  owner: {login: String},
  updated_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (name, id, login, updatedAt) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB  
  var currentRepo = new Repo ({
  	name: name,
  	id: id,
  	owner: {login: login},
  	updated_at: updatedAt
  })
  currentRepo.save(function (err, currentRepo){
  	if (err) return console.log(err);
  	console.log('success');
  });
}

//save('felix', 'abc', '2016-05-18T16:00:00Z')

module.exports.save = save;