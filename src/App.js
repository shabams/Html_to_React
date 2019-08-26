import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './Client/Components/App/Home';
import Schedule2 from './Client/Components/App/Schedules/Schedule2';
import Store from './Client/Utils/Store';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return(
      <Provider store={Store}>
        <Router>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/Schedule2" component={Schedule2} />
        </Router>
      </Provider>
    )
  }
}

export default App;