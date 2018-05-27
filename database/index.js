const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_name: String,
  repo_id: Number,
  owner: String,
  updated_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (body) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB  
  //console.log('save argument body -------->', body)
  var currentRepo = new Repo ({
  	repo_name: body.name,
  	repo_id: body.id,
  	owner: body.owner.login,
  	updated_at: body.updated_at
  })

  currentRepo.save(function (err, currentRepo){
  	if (err) return console.log(err);
  	console.log('success');
  });
}

let find = (cb) => {
	Repo.find(function(err, data){
		if (err) return console.error(err);
		cb(data)
	})
}


//save('felix', 'abc', '2016-05-18T16:00:00Z')
module.exports.find = find;
module.exports.save = save;