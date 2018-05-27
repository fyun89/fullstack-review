import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }
  
  componentDidMount () {
      // $.ajax({
      //   url: 'url',
      //   data: data,
      //   success: 'success',
      //   dataType: 'string'
      // }).then(console.log(data))
      $.get('http://localhost:1128/repo', function(data, status){
        console.log('jquery test data: ', data)
      })
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    var data = {username: term}
    $.ajax({
      type: 'POST',
      url: 'http://localhost:1128/repos',
      data: JSON.stringify(data),
      contentType: 'application/json'
    })
    .done(function(data){
      console.log('success')
    })
    .fail(function(err){
      console.log('failed')
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));