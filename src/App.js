import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './Client/Components/App/Home';
import Store from './Client/Utils/Store';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return(
      <Provider store={Store}>
        <Router>
          <Route exact path="/" component={HomePage} />
        </Router>
      </Provider>
    )
  }
}

export default App;