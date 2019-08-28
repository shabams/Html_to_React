import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './Client/Components/App/Home';
import Schedule2 from './Client/Components/App/Schedules/Schedule2';
import Schedule3 from './Client/Components/App/Schedules/Schedule3';
import Schedule4 from './Client/Components/App/Schedules/Schedule4';
import Schedule5 from './Client/Components/App/Schedules/Schedule5';
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
          <Route exact path="/Schedule3" component={Schedule3} />
          <Route exact path="/Schedule4" component={Schedule4} />
          <Route exact path="/Schedule5" component={Schedule5} />
        </Router>
      </Provider>
    )
  }
}

export default App;