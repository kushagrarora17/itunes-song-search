import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login';
import Lookup from './Lookup/Lookup';

class App extends Component {
  
  state = {
	keyword : ''
  }

  componentDidMount(){
    
  }
  
  render() {
    return (
      <div className="App">
        <h1>Hi, This is an iTunes Song Search App.</h1>
        {/* <Login /> */}
        <Lookup keyword={this.state.keyword} change={this.updateKeywordHandler}/>
      </div>
    );
  }
}

export default App;
