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
      var result

      // fetch('http://localhost:1128/repos')
      // .then(data => data.json())
      // .then((res)=>{
      //   if (!res.success){
      //     console.error('error')
      //   }else{
      //     console.log('succeeded in getting data: ', res)
      //   }
      // })

      // var promise = $.getJSON('http://localhost:1128/repos');
      // promise.done(function(data){
      //   console.log('promise: ', data)
      // })
      // .fail(function(){
      //   console.log('failed')
      // })

      $.ajax({
        url: 'http://localhost:1128/repos',
        type:"GET",
        success: data => this.setState({repos: data})
      })
      //console.log(this.state.repos)
        //.done(console.log('done worked: ', result));

      // $.get('http://localhost:1128/repos', function(data, status){
      //   console.log('jquery test data: ', data)
      // })
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